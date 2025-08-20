import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";

// The vertex shader remains the same
const vertexShader = `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

// The fragment shader is now templatized to accept a precision setting
const createFragmentShader = (precision = 'highp') => `
    precision ${precision} float;

    uniform float uTime;
    uniform vec3 uResolution;
    uniform vec2 uFocal;
    uniform vec2 uRotation;
    uniform float uStarSpeed;
    uniform float uDensity;
    uniform float uHueShift;
    uniform float uSpeed;
    uniform vec2 uMouse;
    uniform float uGlowIntensity;
    uniform float uSaturation;
    uniform bool uMouseRepulsion;
    uniform float uTwinkleIntensity;
    uniform float uRotationSpeed;
    uniform float uRepulsionStrength;
    uniform float uMouseActiveFactor;
    uniform float uAutoCenterRepulsion;
    uniform bool uTransparent;

    varying vec2 vUv;

    #define NUM_LAYER 4.0
    #define STAR_COLOR_CUTOFF 0.2
    #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
    #define PERIOD 3.0
    #define PI 3.14159265359
    #define TWO_PI 6.28318530718

    float Hash21(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
    }

    float tris(float x) {
        return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * fract(x) - 1.0));
    }

    float trisn(float x) {
        return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * fract(x) - 1.0))) - 1.0;
    }

    vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    float Star(vec2 uv, float flare) {
        float d = length(uv);
        float m = (0.05 * uGlowIntensity) / d;
        float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * flare * uGlowIntensity;
        uv *= MAT45;
        rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
        m += rays * 0.3 * flare * uGlowIntensity;
        m *= smoothstep(1.0, 0.2, d);
        return m;
    }

    vec3 StarLayer(vec2 uv) {
        vec3 col = vec3(0.0);
        vec2 gv = fract(uv) - 0.5;
        vec2 id = floor(uv);

        float timeAndSpeed = uTime * uSpeed;

        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 offset = vec2(float(x), float(y));
                vec2 si = id + offset;
                float seed = Hash21(si);
                float size = fract(seed * 345.32);
                
                // OPTIMIZED: Replaced division with multiplication
                float invPeriod = 1.0 / (PERIOD * seed + 1.0);
                float glossLocal = abs(fract(uStarSpeed * invPeriod) * 2.0 - 1.0);
                float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

                vec3 base;
                base.r = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
                base.b = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
                base.g = min(base.r, base.b) * seed;

                float hue = atan(base.g - base.r, base.b - base.r) / TWO_PI + 0.5;
                hue = fract(hue + uHueShift);
                float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
                float val = max(max(base.r, base.g), base.b);
                base = hsv2rgb(vec3(hue, sat, val));

                vec2 pad = vec2(tris(seed * 34.0 + timeAndSpeed * 0.1), tris(seed * 38.0 + timeAndSpeed * 0.0333)) - 0.5;
                float star = Star(gv - offset - pad, flareSize);
                
                float twinkle = mix(1.0, trisn(timeAndSpeed + seed * TWO_PI) * 0.5 + 1.0, uTwinkleIntensity);
                star *= twinkle;

                col += star * size * base;
            }
        }
        return col;
    }

    void main() {
        vec2 focalPx = uFocal * uResolution.xy;
        vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;

        if (uAutoCenterRepulsion > 0.0) {
            vec2 centerUV = vec2(0.0);
            float centerDist = length(uv - centerUV);
            vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
            uv += repulsion * 0.05;
        } else if (uMouseRepulsion) {
            vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
            float mouseDist = length(uv - mousePosUV);
            vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
            uv += repulsion * 0.05 * uMouseActiveFactor;
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
            float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
            float fade = depth * smoothstep(1.0, 0.9, depth);
            col += StarLayer(uv * scale + i * 453.32) * fade;
        }

        if (uTransparent) {
            float alpha = length(col);
            alpha = smoothstep(0.0, 0.3, alpha);
            gl_FragColor = vec4(col, min(alpha, 1.0));
        } else {
            gl_FragColor = vec4(col, 1.0);
        }
    }
`;


export default function Galaxy({
    focal = [0.5, 0.5],
    rotation = [1.0, 0.0],
    starSpeed = 0.5,
    density = 1,
    hueShift = 140,
    disableAnimation = false,
    speed = 1.0,
    mouseInteraction = true,
    glowIntensity = 0.3,
    saturation = 1,
    mouseRepulsion = true,
    repulsionStrength = 2,
    twinkleIntensity = 0.5,
    rotationSpeed = 0.1,
    autoCenterRepulsion = 0,
    transparent = true,
    precision = 'mediump', // <-- NEW PROP: 'highp' or 'mediump'
    ...rest
}) {
    const ctnDom = useRef(null);
    const glState = useRef({});
    const targetMousePos = useRef({ x: 0.5, y: 0.5 });
    const smoothMousePos = useRef({ x: 0.5, y: 0.5 });
    const targetMouseActive = useRef(0.0);
    const smoothMouseActive = useRef(0.0);

    // Store props in a ref to ensure the animation loop always has the latest values
    const propsRef = useRef({});
    useEffect(() => {
      propsRef.current = { starSpeed, disableAnimation };
    });

    useEffect(() => {
        const ctn = ctnDom.current;
        if (!ctn) return;

        const renderer = new Renderer({ alpha: transparent, premultipliedAlpha: false });
        const gl = renderer.gl;
        glState.current.gl = gl;
        ctn.appendChild(gl.canvas);

        if (transparent) {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        }

        const fragment = createFragmentShader(precision);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragment,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: new Color(0, 0, 0) },
                uFocal: { value: new Float32Array(focal) },
                uRotation: { value: new Float32Array(rotation) },
                uStarSpeed: { value: 0 },
                uDensity: { value: density },
                uHueShift: { value: hueShift / 360.0 },
                uSpeed: { value: speed },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
                uGlowIntensity: { value: glowIntensity },
                uSaturation: { value: saturation },
                uMouseRepulsion: { value: mouseRepulsion },
                uTwinkleIntensity: { value: twinkleIntensity },
                uRotationSpeed: { value: rotationSpeed },
                uRepulsionStrength: { value: repulsionStrength },
                uMouseActiveFactor: { value: 0.0 },
                uAutoCenterRepulsion: { value: autoCenterRepulsion },
                uTransparent: { value: transparent },
            },
        });

        const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
        glState.current.program = program;

        const resize = () => {
            renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
            program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
        };
        window.addEventListener("resize", resize, false);
        resize();

        const handleMouseMove = (e) => {
            const rect = ctn.getBoundingClientRect();
            targetMousePos.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: 1.0 - (e.clientY - rect.top) / rect.height,
            };
            targetMouseActive.current = 1.0;
        };
        const handleMouseLeave = () => { targetMouseActive.current = 0.0; };

        if (mouseInteraction) {
            ctn.addEventListener("mousemove", handleMouseMove);
            ctn.addEventListener("mouseleave", handleMouseLeave);
        }

        let animateId;
        const update = (t) => {
            animateId = requestAnimationFrame(update);
            
            const { disableAnimation: currentDisable, starSpeed: currentStarSpeed } = propsRef.current;

            if (!currentDisable) {
                const timeInSeconds = t * 0.001;
                program.uniforms.uTime.value = timeInSeconds;
                program.uniforms.uStarSpeed.value = (timeInSeconds * currentStarSpeed) * 0.1;
            }

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

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener("resize", resize);
            if (mouseInteraction) {
                ctn.removeEventListener("mousemove", handleMouseMove);
                ctn.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (ctn.contains(gl.canvas)) {
                ctn.removeChild(gl.canvas);
            }
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [precision, transparent]); // Re-create only if precision or transparency changes

    useEffect(() => {
        if (!glState.current.program) return;
        const { program } = glState.current;

        program.uniforms.uFocal.value.set(focal);
        program.uniforms.uRotation.value.set(rotation);
        program.uniforms.uDensity.value = density;
        program.uniforms.uHueShift.value = hueShift / 360.0;
        program.uniforms.uSpeed.value = speed;
        program.uniforms.uGlowIntensity.value = glowIntensity;
        program.uniforms.uSaturation.value = saturation;
        program.uniforms.uMouseRepulsion.value = mouseRepulsion;
        program.uniforms.uTwinkleIntensity.value = twinkleIntensity;
        program.uniforms.uRotationSpeed.value = rotationSpeed;
        program.uniforms.uRepulsionStrength.value = repulsionStrength;
        program.uniforms.uAutoCenterRepulsion.value = autoCenterRepulsion;
    }, [
        focal, rotation, density, hueShift, speed, glowIntensity,
        saturation, mouseRepulsion, twinkleIntensity, rotationSpeed,
        repulsionStrength, autoCenterRepulsion
    ]);

    return <div ref={ctnDom} className="w-full h-full relative" {...rest} />;
}