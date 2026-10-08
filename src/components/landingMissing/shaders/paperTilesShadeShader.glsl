#version 300 es
precision highp float;

// Second pass over the paper wall: soft shadows and the vignette.
//
// The wall pass (paperTilesWallShader.glsl) renders the lit paper into a texture, with the
// wall's height in the alpha channel, on a canvas enlarged by uOrigin on every side. Here
// every pixel marches towards the light across that heightfield by sampling the texture,
// instead of rebuilding the tiling at every sample, so slabs and shapes cast soft shadows
// onto anything lower, including their own slab, the neighbours and the logo's floor.

uniform sampler2D uWall;   // rgb: lit paper before shadow, a: height, see the wall shader
uniform vec2 uWallSize;    // size of that texture, texels
uniform vec2 uOrigin;      // margin of the texture around the canvas, device px
uniform vec2 uResolution;  // canvas size, device px
uniform float uPixelRatio; // device px per css px

out vec4 fragColor;

// kept in step with the wall shader
const vec3 LIGHT = vec3(-0.5014, 0.6017, 0.6217); // unit vector, from the upper left
const float LOGO_DEPTH = 10.0;  // how far the logo is cut below the lowest slab, css px
const float HEIGHT_SPAN = 24.5; // the height range the alpha channel covers, from -LOGO_DEPTH up

const float LIGHT_SIZE = 5.0;    // apparent radius of the light, as a slope, for penumbrae
const float SHADOW_REACH = 16.0; // how far a shadow can fall, css px
const float SHADOW_FINE = 7.0;   // the first stretch of the march is sampled every css px ...
const int SHADOW_FINE_STEPS = 2;
const int SHADOW_STEPS = 2;      // ... the rest ever more coarsely up to the reach

// height of the wall at a canvas position, css px, read from the nearest texel: the
// slabs' edges have to stay steps, a filtered ramp would make the march see an edge as
// lower than the slab behind it
float heightAt(vec2 px) {
  return texture(uWall, (px + uOrigin) / uWallSize).a * HEIGHT_SPAN - LOGO_DEPTH;
}

// height of the wall s css px from px towards the light
float heightAlong(vec2 px, float s, vec2 dir) {
  return heightAt(px + dir * s * uPixelRatio);
}

// soft shadow: march from height h0 at px towards the light and keep the smallest
// angular clearance (clearance over distance) of the wall above the ray. Wherever the
// wall steps up between two samples, bisect to the step's edge and measure there, so the
// clearance is a continuous function of the pixel rather than of where samples fall. The
// light's apparent size then turns the angle into a penumbra
float shadowAt(vec2 px, float h0) {
  vec2 dir = normalize(LIGHT.xy);
  float rise = LIGHT.z / length(LIGHT.xy); // how much the ray climbs per css px travelled
  float bias = 0.4;
  float angle = 1.0;
  float sPrev = 0.0;
  float hPrev = h0;
  for (int i = 1; i <= SHADOW_STEPS; i++) {
    float f = float(i - SHADOW_FINE_STEPS) / float(SHADOW_STEPS - SHADOW_FINE_STEPS);
    float s = i <= SHADOW_FINE_STEPS ? float(i) * SHADOW_FINE / float(SHADOW_FINE_STEPS)
                                     : SHADOW_FINE + (SHADOW_REACH - SHADOW_FINE) * f * sqrt(f);
    float h = heightAlong(px, s, dir);
    if (h - hPrev > 0.75) {
      // a step up: find its edge and see how far the wall behind it rises above the ray there
      float lo = sPrev;
      float hi = s;
      float threshold = 0.5 * (h + hPrev);
      for (int j = 0; j < 5; j++) {
        float mid = 0.5 * (lo + hi);
        if (heightAlong(px, mid, dir) > threshold) hi = mid; else lo = mid;
      }
      angle = min(angle, (h0 + hi * rise + bias - h) / max(hi, 0.5));
    }
    float clearance = h0 + s * rise + bias - h;
    angle = min(angle, clearance / s);
    if (angle < -LIGHT_SIZE) break;
    sPrev = s;
    hPrev = h;
  }
  return smoothstep(-LIGHT_SIZE, LIGHT_SIZE, angle);
}

void main(void) {
  vec2 px = gl_FragCoord.xy;
  vec4 wall = texelFetch(uWall, ivec2(px + uOrigin), 0);
  float h0 = wall.a * HEIGHT_SPAN - LOGO_DEPTH;

  // shadows from everything taller towards the light
  vec3 col = wall.rgb * (0.4 + 0.6 * shadowAt(px, h0));

  vec2 v = px / uResolution - 0.5;
  col *= 1.0 - 0.25 * dot(v, v);

  fragColor = vec4(col, 1.0);
}
