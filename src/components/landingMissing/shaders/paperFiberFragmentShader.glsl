#version 300 es
precision highp float;

// Paper post-process. The rendered wall is looked up through a field of fine fibres so
// that edges fray a little, then modulated by fibre lightness, the cloudy formation of
// the sheet and a fine grain. The paper itself stays still while the tiles move under it.

uniform sampler2D uScene;
uniform vec2 uResolution;  // device pixels
uniform float uPixelRatio; // device pixels per css pixel

out vec4 fragColor;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// value noise stretched along a direction: long thin fibres
float fibres(vec2 p, float angle, float len, float thick) {
  float c = cos(angle);
  float s = sin(angle);
  vec2 r = vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  return vnoise(vec2(r.x / len, r.y / thick));
}

void main(void) {
  vec2 p = gl_FragCoord.xy / uPixelRatio; // css pixels, so the paper looks the same on every screen

  float f1 = fibres(p, 0.4, 16.0, 1.3);
  float f2 = fibres(p + 31.7, 1.9, 22.0, 1.6);
  float f3 = fibres(p + 77.1, -1.0, 12.0, 1.1);
  float f4 = fibres(p + 5.3, 2.6, 30.0, 2.2);
  float fibre = (f1 + f2 + f3 + f4) * 0.25 - 0.5;
  float cloud = vnoise(p / 90.0) - 0.5;
  float grain = hash12(p * 1.7) - 0.5;

  // look the scene up through the fibres: edges pick up a slight fray
  vec2 disp = (vec2(f4, f2) - 0.5) * 1.1 * uPixelRatio;
  vec2 uv = (gl_FragCoord.xy + disp) / uResolution;
  vec3 col = texture(uScene, uv).rgb;

  // and a little bleed along the fibres
  vec2 along = vec2(cos(0.4), sin(0.4)) * 0.8 * uPixelRatio / uResolution;
  col = (col * 2.0 + texture(uScene, uv + along).rgb + texture(uScene, uv - along).rgb) * 0.25;

  col *= 1.0 + 0.11 * fibre + 0.07 * cloud + 0.04 * grain;

  vec2 v = gl_FragCoord.xy / uResolution - 0.5;
  col *= 1.0 - 0.25 * dot(v, v);

  fragColor = vec4(col, 1.0);
}
