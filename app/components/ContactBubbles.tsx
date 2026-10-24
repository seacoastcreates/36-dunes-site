"use client";

import { useEffect, useRef } from "react";

const VERTEX = "attribute vec2 a_pos;void main(){gl_Position=vec4(a_pos,0.0,1.0);}";

// Three parallax layers of bubbles drifting up through a hashed grid. Each
// layer is denser, smaller and faster than the last. Each row sways sideways
// on its own phase (constant across a row, so bubbles stay round) so the rise
// doesn't look mechanical.
const FRAGMENT = `precision highp float;
uniform vec2 u_res;
uniform float u_time;
const vec3 GOLD = vec3(0.878, 0.698, 0.369);
float hash21(vec2 p){ p = fract(p*vec2(127.1, 311.7)); p += dot(p, p + 19.19); return fract(p.x*p.y); }
vec2 hash22(vec2 p){ return vec2(hash21(p), hash21(p + 47.3)); }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv; p.x *= u_res.x / max(u_res.y, 1.0);
  float c = 0.0;
  for (int k = 0; k < 3; k++){
    float fk = float(k);
    float sc = 4.0 + fk*3.0;
    vec2 q = p*vec2(sc, sc*0.62);
    q.y -= u_time*(0.18 + fk*0.11);
    float row = floor(q.y);
    q.x += sin(u_time*0.5 + row*1.7 + fk*2.1)*0.15;
    vec2 id = floor(q); vec2 gv = fract(q) - 0.5;
    float h = hash21(id + fk*5.0);
    if (h < 0.7) continue; // leave some cells empty so bubbles don't tile
    vec2 o = (hash22(id + fk*11.0) - 0.5)*0.5;
    vec2 v = (gv - o)*vec2(1.0, 1.61); // undo the 0.62 cell squash
    float d = length(v);
    float rad = 0.08 + 0.45*(h - 0.7);
    // translucent fill, a brighter rim, and a small highlight up and to the left
    float body = smoothstep(rad, rad*0.3, d)*0.18;
    float rim = smoothstep(rad*0.62, rad*0.86, d)*smoothstep(rad, rad*0.88, d);
    float shine = smoothstep(rad*0.28, 0.0, length(v - vec2(-0.35, 0.35)*rad));
    float tw = 0.7 + 0.3*sin(u_time*(0.7 + 0.8*h) + h*6.28);
    c += (body + rim*0.9 + shine*0.8)*tw*(0.7 + 0.3*h)*(1.0 - fk*0.2);
  }
  c *= mix(0.45, 1.0, smoothstep(1.0, 0.1, uv.y));
  c *= smoothstep(0.38, 0.8, uv.x); // keep the copy and form side clear
  float a = clamp(c*0.5, 0.0, 0.5);
  gl_FragColor = vec4(GOLD*a, a); // premultiplied
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ContactBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // One oversized triangle covers the whole viewport.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2) * 0.75;
      canvas!.width = Math.max(1, Math.floor(canvas!.offsetWidth * ratio));
      canvas!.height = Math.max(1, Math.floor(canvas!.offsetHeight * ratio));
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }

    function draw(seconds: number) {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, seconds);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function tick(now: number) {
      draw(now / 1000);
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(12);
    });
    resizeObserver.observe(canvas);

    // Only animate while the section is on screen.
    const visibility = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        if (!frame && !reduceMotion) frame = requestAnimationFrame(tick);
      } else {
        stop();
      }
    });
    visibility.observe(canvas);

    resize();
    if (reduceMotion) draw(12);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className="contact-bubbles" aria-hidden="true" />;
}
