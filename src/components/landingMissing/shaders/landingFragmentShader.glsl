#define TAU                         6.2831853071795862
precision mediump float;
uniform float uTime;
uniform vec2 uCenter;
uniform vec2 uInverseResolution;
uniform float uProportion;
const float amplitude = 250.0;

void main(void) {
  vec2 uv = (vec2(gl_FragCoord.xy) * vec2(uProportion, 1.0) - uCenter );
  float angle = atan(uv.y, uv.x);
  float radius = length(uv) * 1.0 + sin(angle );
  float localAmplitude = (1.5 + 0.5 * sin(radius * 10.0 / amplitude) + uProportion) * amplitude;
  float index = radius  / localAmplitude;
  radius = radius / localAmplitude + (angle + sin(angle * (index - mod(index, 1.0))) + uTime) / TAU;
  vec3 color = vec3(0.5 + 0.5 * sin(TAU * radius - 1.0), 0.5 + 0.5 * sin(TAU * radius), 0.5 + 0.5 * sin(TAU * radius + 1.0));
  gl_FragColor = vec4(color, 1.0);
}
