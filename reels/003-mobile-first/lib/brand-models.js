import * as THREE from "three";
// 3dicons FBX models come in their own colours. Map every part to the Fortune Code palette by its
// original colour: saturated parts become Fortune Green, light parts Light Gray clay, dark parts black gloss.
const GREEN = 0x00DB33, LIGHT = 0xF0F1F2, BLACK = 0x1a1d20;
export function brandMaterial(kind) {
  if (kind === "green") return new THREE.MeshPhysicalMaterial({ color: GREEN, roughness: 0.32, metalness: 0.05, clearcoat: 0.8, clearcoatRoughness: 0.2, emissive: GREEN, emissiveIntensity: 0.08 });
  if (kind === "light") return new THREE.MeshPhysicalMaterial({ color: LIGHT, roughness: 0.55, metalness: 0, clearcoat: 0.3 });
  return new THREE.MeshPhysicalMaterial({ color: BLACK, roughness: 0.22, metalness: 0.35, clearcoat: 1, clearcoatRoughness: 0.1 });
}
export function kindOf(color) {
  const hsl = {}; color.getHSL(hsl);
  if (hsl.s > 0.3 && hsl.l > 0.15 && hsl.l < 0.85) return "green";
  return hsl.l > 0.55 ? "light" : "dark";
}
export function recolor(obj, override) {
  obj.traverse((m) => {
    if (!m.isMesh) return;
    m.castShadow = m.receiveShadow = true;
    const fix = (mat) => { const k = override?.(mat) ?? kindOf(mat.color || new THREE.Color(1, 1, 1)); const nm = brandMaterial(k); nm.userData.kind = k; return nm; };
    m.material = Array.isArray(m.material) ? m.material.map(fix) : fix(m.material);
  });
  return obj;
}
