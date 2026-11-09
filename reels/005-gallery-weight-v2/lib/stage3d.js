// Shared 2.5D stage for Fortune Code reels: a three.js scene over an HTML background, driven by a
// paused GSAP timeline that HyperFrames seeks. Extracted from the Page Speed reel (2026-10-29).
//
// Coordinates: x/y are in frame pixels (1080x1920, origin top-left), z is in scene units.
// 1 unit = 100 px on the z = 0 plane. Every animated value lives in a plain object (`st`) that
// GSAP tweens; draw() copies those values onto the scene. Nothing reads the clock, so any frame
// can be rendered in any order (seek-safe).
import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { recolor } from "./brand-models.js";

export { THREE };

/** Map original part colours to brand kinds per model: SWAP({ dark: "light" }) etc. */
export const SWAP = (map) => (mat) => {
  const hsl = {}; mat.color.getHSL(hsl);
  const k = hsl.s > 0.3 && hsl.l > 0.15 && hsl.l < 0.85 ? "green" : hsl.l > 0.55 ? "light" : "dark";
  return map[k] ?? k;
};

/** Per-model colour fixes that worked on the 3dicons set. Extend in the reel, never edit here per reel. */
export const DEFAULT_FIX = {
  flash: () => "green", puzzle: () => "green", chat: SWAP({ dark: "light" }), picture: SWAP({ dark: "light", light: "green" }),
  boy: SWAP({ dark: "green" }), dollar: SWAP({ dark: "green" }), target: SWAP({ dark: "green" }), "trash-can": SWAP({ dark: "light" }),
  zoom: SWAP({ green: "light", light: "green" }), setting: () => "light", computer: SWAP({}), mobile: SWAP({}),
};

/** Deterministic pseudo-random in [0, 1) (Math.random is not allowed in a composition). */
export const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export async function createStage({ canvas, models = [], fix = {}, fov = 35, modelDir = "assets/models", shadows = true }) {
  const FOV = fov, CZ = 9.6 / Math.tan((FOV / 2) * Math.PI / 180);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(1080, 1920, false); renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = shadows; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.55;
  const camera = new THREE.PerspectiveCamera(FOV, 1080 / 1920, 0.1, 400);
  const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(-6, 10, 14); key.castShadow = shadows;
  key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -12, right: 12, top: 14, bottom: -14, near: 1, far: 60 }); scene.add(key);
  const rim = new THREE.DirectionalLight(0x00DB33, 1.4); rim.position.set(8, 3, -6); scene.add(rim);
  const back = new THREE.DirectionalLight(0xffffff, 0.6); back.position.set(-4, -2, -8); scene.add(back);
  const X = (px) => (px - 540) / 100, Y = (py) => (960 - py) / 100;

  // models: load once, recolour to the brand, normalise the longest side to 1 unit
  const loader = new FBXLoader(), TPL = {}, FIX = { ...DEFAULT_FIX, ...fix };
  await Promise.all(models.map(async (n) => {
    const obj = await loader.loadAsync(`${modelDir}/${n}.fbx`);
    recolor(obj, FIX[n]);
    const box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
    const m = Math.max(size.x, size.y, size.z);
    const wrap = new THREE.Group(); obj.position.sub(c); wrap.add(obj); wrap.scale.setScalar(1 / m);
    TPL[n] = { obj: wrap, size: size.clone().divideScalar(m) };
  }));

  const insts = [];
  /** A placed copy of a model. `st` is what the timeline animates: x/y px, z units, s scale, o opacity, float px. */
  const inst = (name, st) => {
    if (!TPL[name]) throw new Error(`model "${name}" not loaded: add it to models[]`);
    const g = TPL[name].obj.clone(true);
    g.traverse((m) => { if (m.isMesh) m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone(); });
    const holder = new THREE.Group(); holder.add(g); scene.add(holder);
    const it = { g: holder, name, size: TPL[name].size, st: Object.assign({ x: 540, y: 700, z: 0, s: 3, sx: 1, sy: 1, rx: 0, ry: 0, rz: 0, o: 0, float: 0, ph: insts.length }, st) };
    insts.push(it); return it;
  };
  const setOpacity = (obj, o) => obj.traverse((m) => {
    if (!m.isMesh) return;
    (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { mt.transparent = o < 0.999; mt.opacity = o; mt.depthWrite = o > 0.5; });
  });

  // floor that only shows as shadow
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.35 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const FL = { y: 1000 };

  /** A canvas you draw a screen on (phone page, dashboard); returns { c, g, t } with t a CanvasTexture. */
  const board = (w, h) => {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
    return { c, g: c.getContext("2d"), t };
  };
  const screenPlane = (tex, w, h) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true }));

  const cam = { x: 0, y: 0, z: CZ, rx: 0, ry: 0, rz: 0 };
  const hooks = []; // extra per-frame callbacks (t) => void, e.g. redraw a screen
  const draw = (t) => {
    camera.position.set(cam.x, cam.y, cam.z); camera.rotation.set(cam.rx, cam.ry, cam.rz);
    floor.position.y = Y(FL.y);
    insts.forEach((it) => {
      const s = it.st, g = it.g;
      g.visible = s.o > 0.01; if (!g.visible) return;
      const fl = s.float ? Math.sin(t * 1.7 + s.ph) * s.float : 0;
      g.position.set(X(s.x), Y(s.y + fl), s.z);
      g.rotation.set(s.rx, s.ry + Math.sin(t * 0.9 + s.ph) * 0.06, s.rz);
      g.scale.set(s.s * s.sx, s.s * s.sy, s.s);
      setOpacity(g, Math.min(1, s.o));
    });
    hooks.forEach((h) => h(t));
    renderer.render(scene, camera);
  };

  return { THREE, renderer, scene, camera, cam, CZ, X, Y, TPL, inst, insts, setOpacity, floor, FL, board, screenPlane, hooks, draw };
}

/**
 * Timeline helpers. Times passed in are ORIGINAL voice-over seconds (the word timings of the
 * unsped take); `at()` divides by the speed so the cue lands on the sped-up audio.
 */
export function helpers(tl, stage, { speed = 1, bgEl = null } = {}) {
  const T = (s) => s / speed, at = T;
  const W = { bg: bgEl ? getComputedStyle(bgEl).backgroundColor : "#121416" };
  if (bgEl) stage.hooks.push(() => { bgEl.style.background = W.bg; });
  return {
    T, at, W,
    /** switch the world colour (A #121416, B #006A39, C #F0F1F2) */
    world: (t, color, d = 0.18) => tl.to(W, { bg: color, duration: d, ease: "none" }, at(t)),
    /** bring a model in: tween from `from` to `to`; arrival decelerates (no fade from zero scale) */
    show: (it, t, from, to, d = 0.5, ease = "back.out(1.6)") => tl.fromTo(it.st, Object.assign({ o: 0 }, from), Object.assign({ o: 1, duration: d, ease, immediateRender: false }, to), at(t)),
    hide: (it, t, to = {}, d = 0.3, ease = "power2.in") => tl.to(it.st, Object.assign({ o: 0, duration: d, ease }, to), at(t)),
    /** full-screen type/number: punch in at t0, leave at t1 */
    big: (sel, t0, t1) => {
      tl.fromTo(sel, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)", immediateRender: false }, at(t0));
      tl.to(sel, { opacity: 0, scale: 1.15, duration: 0.2, ease: "power2.in" }, at(t1));
    },
    /** count a number in an element; fmt(v) returns innerHTML */
    count: (sel, t0, d, from, to, fmt) => {
      const o = { v: from }, el = document.querySelector(sel); el.innerHTML = fmt(from);
      tl.fromTo(o, { v: from }, { v: to, duration: T(d), ease: "power2.out", immediateRender: false, onUpdate: () => { el.innerHTML = fmt(o.v); } }, at(t0));
    },
    /** squash on impact: quick sy dip and recover */
    squash: (it, t, amt = 0.78) => tl.to(it.st, { sy: amt, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.out" }, at(t)),
    /** alarm-style shake on rz */
    shake: (it, t, n = 11, amp = 0.09) => tl.to(it.st, { rz: amp, duration: 0.05, yoyo: true, repeat: n, ease: "none" }, at(t)),
  };
}
