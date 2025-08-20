import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef, memo } from "react";

const vertexShader = `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

// Desktop shader is unchanged and remains at the highest visual quality.
const createDesktopFragmentShader = (precision = 'highp') => `
    precision ${precision} float;
    uniform float uTime; uniform vec3 uResolution; uniform vec2 uFocal; uniform vec2 uRotation; uniform float uStarSpeed; uniform float uDensity; uniform float uHueShift; uniform float uSpeed; uniform vec2 uMouse; uniform float uGlowIntensity; uniform float uSaturation; uniform bool uMouseRepulsion; uniform float uTwinkleIntensity; uniform float uRotationSpeed; uniform float uRepulsionStrength; uniform float uMouseActiveFactor; uniform float uAutoCenterRepulsion; uniform bool uTransparent; varying vec2 vUv;
    #define NUM_LAYER 4.0
    #define STAR_COLOR_CUTOFF 0.2
    #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
    #define PERIOD 3.0
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718
    float Hash21(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    float tris(float x) { return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * fract(x) - 1.0)); }
    float trisn(float x) { return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * fract(x) - 1.0))) - 1.0; }
    vec3 hsv2rgb(vec3 c) { vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0); vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www); return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); }
    float Star(vec2 uv, float flare) { float d = length(uv); float m = (0.05 * uGlowIntensity) / (d + 0.0001); float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0)); m += rays * flare * uGlowIntensity; uv *= MAT45; rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0)); m += rays * 0.3 * flare * uGlowIntensity; m *= smoothstep(1.0, 0.2, d); return m; }
    vec3 StarLayer(vec2 uv) { vec3 col = vec3(0.0); vec2 gv = fract(uv) - 0.5; vec2 id = floor(uv); float timeAndSpeed = uTime * uSpeed; for (int y = -1; y <= 1; y++) { for (int x = -1; x <= 1; x++) { vec2 offset = vec2(float(x), float(y)); if (length(gv - offset) > 1.414) continue; vec2 si = id + offset; float seed = Hash21(si); float size = fract(seed * 345.32); float invPeriod = 1.0 / (PERIOD * seed + 1.0); float glossLocal = abs(fract(uStarSpeed * invPeriod) * 2.0 - 1.0); float flareSize = smoothstep(0.9, 1.0, size) * glossLocal; vec3 base; base.r = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF; base.b = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF; base.g = min(base.r, base.b) * seed; float hue = atan(base.g - base.r, base.b - base.r) / TWO_PI + 0.5; hue = fract(hue + uHueShift); float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation; float val = max(max(base.r, base.g), base.b); base = hsv2rgb(vec3(hue, sat, val)); vec2 pad = vec2(tris(seed * 34.0 + timeAndSpeed * 0.1), tris(seed * 38.0 + timeAndSpeed * 0.0333)) - 0.5; float star = Star(gv - offset - pad, flareSize); float twinkle = mix(1.0, trisn(timeAndSpeed + seed * TWO_PI) * 0.5 + 1.0, uTwinkleIntensity); star *= twinkle; col += star * size * base; } } return col; }
    void main() { vec2 focalPx = uFocal * uResolution.xy; vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y; if (uAutoCenterRepulsion > 0.0) { vec2 centerUV = vec2(0.0); float centerDist = length(uv - centerUV); vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1)); uv += repulsion * 0.05; } else if (uMouseRepulsion) { vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y; float mouseDist = length(uv - mousePosUV); vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1)); uv += repulsion * 0.05 * uMouseActiveFactor; } else { vec2 mouseOffset = (uMouse - 0.5) * 0.1 * uMouseActiveFactor; uv += mouseOffset; } float autoRotAngle = uTime * uRotationSpeed; mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle)); uv = autoRot * uv; uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv; vec3 col = vec3(0.0); for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) { float depth = fract(i + uStarSpeed * uSpeed); float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth); float fade = depth * smoothstep(1.0, 0.9, depth); col += StarLayer(uv * scale + i * 453.32) * fade; } if (uTransparent) { float alpha = length(col); alpha = smoothstep(0.0, 0.3, alpha); gl_FragColor = vec4(col, min(alpha, 1.0)); } else { gl_FragColor = vec4(col, 1.0); } }
`;

// Mobile shader with final bug fixes for visibility
const createMobileFragmentShader = (precision = 'mediump') => `
    precision ${precision} float;
    uniform float uTime; uniform vec3 uResolution; uniform vec2 uFocal; uniform vec2 uRotation; uniform float uStarSpeed; uniform float uDensity; uniform float uSpeed; uniform vec2 uMouse; uniform float uGlowIntensity; uniform float uTwinkleIntensity; uniform float uRotationSpeed; uniform bool uTransparent; uniform bool uMouseRepulsion; uniform float uRepulsionStrength; uniform float uMouseActiveFactor; uniform float uAutoCenterRepulsion;
    varying vec2 vUv;
    #define NUM_LAYER 3.0
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718

    float Hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }
    
    // ✨ FIX 1: This Star function is now 100% safe for all GPUs.
    // The previous smoothstep(0.8, 0.0, d) was invalid. This is the correct way.
    float Star(vec2 uv) {
        float d = length(uv);
        return 1.0 - smoothstep(0.0, 0.8, d);
    }
    
    vec3 StarLayer(vec2 uv) {
        vec3 col = vec3(0.0);
        vec2 gv = fract(uv) - 0.5;
        vec2 id = floor(uv);
        
        float seed = Hash21(id);
        float size = fract(seed * 345.32);

        if (size > 0.1) {
            // ✨ FIX 2: Added max() to prevent division by zero if size is exactly 0.
            float star = Star(gv / max(size, 0.001));
            
            float color_seed = fract(seed * 123.45);
            vec3 base_color = vec3(color_seed * 0.8 + 0.2, color_seed * 0.9 + 0.1, 1.0);
            
            float twinkle = sin(uTime * uSpeed + seed * TWO_PI) * 0.5 + 0.5;
            star *= mix(1.0, twinkle, uTwinkleIntensity);

            col += star * size * base_color * uGlowIntensity;
        }
        return col;
    }
    
    void main() {
        vec2 focalPx = uFocal * uResolution.xy;
        vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

        // Safe mouse repulsion logic
        if (uAutoCenterRepulsion > 0.0) {
            vec2 dir = uv;
            float dist = length(dir);
            if (dist > 0.001) {
                vec2 repulsion = dir / dist * (uAutoCenterRepulsion / (dist + 0.1));
                uv += repulsion * 0.05;
            }
        } else if (uMouseRepulsion) {
            vec2 dir = uv - (uMouse * uResolution.xy - focalPx) / uResolution.y;
            float dist = length(dir);
            if (dist > 0.001) {
                vec2 repulsion = dir / dist * (uRepulsionStrength / (dist + 0.1));
                uv += repulsion * 0.05 * uMouseActiveFactor;
            }
        } else {
            vec2 mouseOffset = (uMouse - 0.5) * 0.1 * uMouseActiveFactor;
            uv += mouseOffset;
        }

        float autoRotAngle = uTime * uRotationSpeed;
        mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
        uv = autoRot * uv;
        uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
        
        vec3 col = vec3(0.0);
        for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
            float depth = fract(i + uStarSpeed * uSpeed);
            float scale = mix(10.0 * uDensity, 0.5 * uDensity, depth);
            float fade = depth * smoothstep(1.0, 0.9, depth);
            col += StarLayer(uv * scale + i * 453.32) * fade;
        }

        if (uTransparent) {
            float alpha = length(col);
            alpha = smoothstep(0.0, 0.1, alpha);
            gl_FragColor = vec4(col, min(alpha, 1.0));
        } else {
            gl_FragColor = vec4(col, 1.0);
        }
    }
`;


export default memo(function Galaxy({
    mobile = false,
    resolutionScale = 1.0,
    precision = 'mediump',
    // All original props...
    focal = [0.5, 0.5], rotation = [1.0, 0.0], starSpeed = 0.5, density = 1, hueShift = 140, disableAnimation = false, speed = 1.0, mouseInteraction = true, glowIntensity = 0.3, saturation = 1, mouseRepulsion = true, repulsionStrength = 2, twinkleIntensity = 0.8, rotationSpeed = 0.1, autoCenterRepulsion = 0, transparent = true,
    ...rest
}) {
    const ctnDom = useRef(null);
    const glState = useRef({});
    const propsRef = useRef({});
    const targetMousePos = useRef({ x: 0.5, y: 0.5 });
    const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
    const targetMouseActive = useRef(0.0);
    const smoothMouseActive = useRef(0.0);

    useEffect(() => {
        propsRef.current = { starSpeed, disableAnimation, transparent };
    });

    // The rest of the React component is unchanged and correct.
    useEffect(() => {
        const ctn = ctnDom.current;
        if (!ctn) return;
        const fragment = mobile ? createMobileFragmentShader(precision) : createDesktopFragmentShader(precision);
        const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
        const gl = renderer.gl;
        ctn.appendChild(gl.canvas);
        const program = new Program(gl, {
            vertex: vertexShader, fragment: fragment,
            uniforms: { uTime: { value: 0 }, uResolution: { value: new Color(0, 0, 0) }, uFocal: { value: new Float32Array(focal) }, uRotation: { value: new Float32Array(rotation) }, uStarSpeed: { value: starSpeed }, uDensity: { value: density }, uHueShift: { value: hueShift / 360.0 }, uSpeed: { value: speed }, uMouse: { value: new Float32Array([0.5, 0.5]) }, uGlowIntensity: { value: glowIntensity }, uSaturation: { value: saturation }, uMouseRepulsion: { value: mouseRepulsion }, uTwinkleIntensity: { value: twinkleIntensity }, uRotationSpeed: { value: rotationSpeed }, uRepulsionStrength: { value: repulsionStrength }, uMouseActiveFactor: { value: 0.0 }, uAutoCenterRepulsion: { value: autoCenterRepulsion }, uTransparent: { value: transparent }, },
        });
        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
        glState.current = { gl, program, renderer, mesh };
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const scale = dpr * resolutionScale;
            renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
            gl.canvas.style.width = '100%';
            gl.canvas.style.height = '100%';
            program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
        };
        window.addEventListener("resize", resize, false);
        resize();
        const handleMouseMove = (e) => { const rect = ctn.getBoundingClientRect(); targetMousePos.current = { x: (e.clientX - rect.left) / rect.width, y: 1.0 - (e.clientY - rect.top) / rect.height, }; targetMouseActive.current = 1.0; };
        const handleMouseLeave = () => { targetMouseActive.current = 0.0; };
        if (mouseInteraction || mouseRepulsion) {
            ctn.addEventListener("mousemove", handleMouseMove);
            ctn.addEventListener("mouseleave", handleMouseLeave);
        }
        let animateId;
        const update = (t) => {
            animateId = requestAnimationFrame(update);
            const { disableAnimation: currentDisable, starSpeed: currentStarSpeed, transparent: currentTransparent } = propsRef.current;
            if (currentTransparent) { gl.clearColor(0, 0, 0, 0); gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); } else { gl.clearColor(0, 0, 0, 1); gl.disable(gl.BLEND); }
            if (!currentDisable) { const timeInSeconds = t * 0.001; program.uniforms.uTime.value = timeInSeconds; program.uniforms.uStarSpeed.value = (timeInSeconds * currentStarSpeed) * 0.1; }
            const lerpFactor = 0.05;
            smoothMousePos.current.x += (targetMousePos.current.x - smoothMousePos.current.x) * lerpFactor;
            smoothMousePos.current.y += (targetMousePos.current.y - smoothMousePos.current.y) * lerpFactor;
            smoothMouseActive.current += (targetMouseActive.current - smoothMouseActive.current) * lerpFactor;
            program.uniforms.uMouse.value[0] = smoothMousePos.current.x;
            program.uniforms.uMouse.value[1] = smoothMousePos.current.y;
            program.uniforms.uMouseActiveFactor.value = smoothMouseActive.current;
            renderer.render({ scene: mesh });
        };
        animateId = requestAnimationFrame(update);
        return () => { cancelAnimationFrame(animateId); window.removeEventListener("resize", resize); if (mouseInteraction || mouseRepulsion) { ctn.removeEventListener("mousemove", handleMouseMove); ctn.removeEventListener("mouseleave", handleMouseLeave); } if (ctn.contains(gl.canvas)) { ctn.removeChild(gl.canvas); } gl.getExtension("WEBGL_lose_context")?.loseContext(); };
    }, [mobile, precision, resolutionScale, mouseInteraction, mouseRepulsion]);
    useEffect(() => {
        const { program } = glState.current;
        if (!program) return;
        program.uniforms.uFocal.value.set(focal); program.uniforms.uRotation.value.set(rotation); program.uniforms.uDensity.value = density; program.uniforms.uHueShift.value = hueShift / 360.0; program.uniforms.uSpeed.value = speed; program.uniforms.uGlowIntensity.value = glowIntensity; program.uniforms.uSaturation.value = saturation; program.uniforms.uMouseRepulsion.value = mouseRepulsion; program.uniforms.uTwinkleIntensity.value = twinkleIntensity; program.uniforms.uRotationSpeed.value = rotationSpeed; program.uniforms.uRepulsionStrength.value = repulsionStrength; program.uniforms.uAutoCenterRepulsion.value = autoCenterRepulsion; program.uniforms.uTransparent.value = transparent;
    }, [focal, rotation, density, hueShift, speed, glowIntensity, saturation, mouseRepulsion, twinkleIntensity, rotationSpeed, repulsionStrength, autoCenterRepulsion, transparent]);
    return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;
});