/* Escena 3D (Three.js): una forma orgánica que respira, rodeada de pequeñas esferas.
   Se desplaza y cambia de tono a medida que avanzas por las secciones. */
import * as THREE from 'three';

const canvas = document.getElementById('scene');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const css = getComputedStyle(document.documentElement);
const col = (v) => new THREE.Color(css.getPropertyValue(v).trim());

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
camera.position.set(0, 0, 9);

const noise = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;
vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.0+3.0*C.xxx;
i=mod(i,289.0);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

const uniforms = {
  uTime: { value: 0 },
  uAmp: { value: 0.32 },
  uA: { value: col('--color-accent') },
  uB: { value: col('--color-accent-300') },
  uC: { value: col('--color-accent-2') },
  uMix: { value: 0 },
};
const blobMat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `${noise}
    uniform float uTime; uniform float uAmp;
    varying vec3 vN; varying float vD; varying vec3 vView;
    void main(){
      float d = snoise(normal * 1.1 + uTime * 0.25) * uAmp + snoise(normal * 2.6 - uTime * 0.18) * uAmp * 0.35;
      vec3 p = position + normal * d;
      vD = d;
      vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vView = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`,
  fragmentShader: `
    uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uMix;
    varying vec3 vN; varying float vD; varying vec3 vView;
    void main(){
      float light = dot(vN, normalize(vec3(-0.4, 0.7, 0.6))) * 0.5 + 0.5;
      float fres = pow(1.0 - max(dot(vN, vView), 0.0), 2.2);
      vec3 base = mix(uA, uC, uMix);
      vec3 c = mix(base * 0.78, uB, smoothstep(-0.25, 0.35, vD) * 0.55);
      c *= 0.72 + light * 0.4;
      c = mix(c, uB, fres * 0.55);
      gl_FragColor = vec4(c, 1.0);
    }`,
});
const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 64), blobMat);
scene.add(blob);

// Pequeñas esferas que orbitan; algunas oscuras y "peludas" a modo de guiño ghibli.
scene.add(new THREE.HemisphereLight(0xfff4e6, 0x7a8a5e, 1.6));
const dir = new THREE.DirectionalLight(0xffffff, 1.4); dir.position.set(-3, 4, 5); scene.add(dir);
const orbiters = [];
const palette = [col('--color-accent-2'), col('--color-accent-400'), col('--color-surface'), col('--color-neutral-900')];
for (let i = 0; i < 9; i++) {
  const dark = i % 3 === 2;
  const r = dark ? 0.16 : 0.1 + Math.random() * 0.18;
  const geo = dark ? new THREE.IcosahedronGeometry(r, 3) : new THREE.SphereGeometry(r, 32, 32);
  if (dark) { // superficie irregular
    const pos = geo.attributes.position;
    for (let k = 0; k < pos.count; k++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, k);
      v.multiplyScalar(1 + Math.random() * 0.35);
      pos.setXYZ(k, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
  }
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: dark ? palette[3] : palette[i % 3], roughness: dark ? 1 : 0.55, flatShading: dark,
  }));
  m.userData = { radius: 2.3 + Math.random() * 1.1, speed: 0.12 + Math.random() * 0.22, phase: Math.random() * Math.PI * 2, tilt: (Math.random() - 0.5) * 1.4, bob: Math.random() * 3 };
  orbiters.push(m); scene.add(m);
}
const group = new THREE.Group();
scene.remove(blob); group.add(blob); orbiters.forEach((o) => { scene.remove(o); group.add(o); });
scene.add(group);

// Posición del grupo por sección: [x (fracción del ancho visible), y, escala, mezcla salvia, opacidad canvas]
const stops = [
  [0.26, 0.05, 1.0, 0.0, 1],
  [0.36, 0.25, 0.55, 0.6, 0.55],
  [0.42, 0.35, 0.42, 0.0, 0.45],
  [0.4, -0.15, 0.45, 0.8, 0.4],
  [0.38, 0.2, 0.5, 0.3, 0.45],
  [0.0, 0.0, 0.7, 0.5, 0.35],
  [0.3, 0.1, 0.6, 1.0, 0.5],
];
const state = { x: 0, y: 0, s: 1, mix: 0, op: 1 };
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', (e) => { mouse.tx = e.clientX / innerWidth - 0.5; mouse.ty = e.clientY / innerHeight - 0.5; });

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

const clock = new THREE.Clock();
function frame() {
  const t = clock.getElapsedTime();
  const mobile = innerWidth < 760;
  const st = stops[window.__activeSection ?? 0] || stops[0];
  const visW = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect;
  let tx = mobile ? st[0] * 0.6 : st[0], ts = mobile ? st[2] * 0.75 : st[2];
  if (!mobile && (window.__activeSection ?? 0) === 0) {
    // Mantener la forma a la derecha del texto del hero
    const copy = document.querySelector('.hero-copy');
    const right = copy ? copy.getBoundingClientRect().right / innerWidth : 0.6;
    const free = Math.max(1 - right, 0.18);
    ts = Math.min(1, Math.max(0.45, free * 2.2));
    const radiusFrac = (2.2 * ts) / visW;
    tx = Math.max(0.26, right - 0.5 + radiusFrac * 1.05);
  }
  const k = 0.045;
  state.x += (tx * visW - state.x) * k;
  state.y += ((mobile && (window.__activeSection ?? 0) === 0 ? 1.1 : st[1] * 3) - state.y) * k;
  state.s += (ts - state.s) * k;
  state.mix += (st[3] - state.mix) * k;
  state.op += (st[4] - state.op) * k;
  mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;

  uniforms.uTime.value = reduce ? 0 : t;
  uniforms.uMix.value = state.mix;
  group.position.set(state.x + mouse.x * 0.4, state.y - mouse.y * 0.3, 0);
  group.scale.setScalar(state.s);
  blob.rotation.y = t * 0.08 + (window.__scroll || 0) * 4 + mouse.x * 0.6;
  blob.rotation.x = mouse.y * 0.4;
  orbiters.forEach((o) => {
    const d = o.userData, a = d.phase + (reduce ? 0 : t) * d.speed;
    o.position.set(Math.cos(a) * d.radius, Math.sin(a * 1.3 + d.bob) * 0.5 + Math.sin(a) * d.tilt, Math.sin(a) * d.radius * 0.6);
    o.rotation.set(t * 0.3, t * 0.4, 0);
  });
  canvas.style.opacity = state.op.toFixed(3);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();
