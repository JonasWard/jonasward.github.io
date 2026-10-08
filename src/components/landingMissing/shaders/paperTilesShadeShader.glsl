#version 300 es
precision highp float;

// Second pass over the paper wall: soft shadows and the vignette.
//
// The wall pass (paperTilesWallShader.glsl) renders the lit paper into a texture, with the
// wall's height in the alpha channel, on a canvas enlarged by uOrigin on every side. Here
// every pixel marches towards the light across that heightfield by sampling the texture,
// instead of rebuilding the tiling at every sample, so slabs and shapes cast soft shadows
// onto anything lower, including their own slab, the neighbours and the logo's floor.
//
// The march is a fixed set of samples and the texture is filtered, so the shadow is a
// continuous function of where the pixel sits relative to the slabs: as the tiling slides,
// every pixel's shadow eases along instead of flipping when an edge crosses a sample.

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
const int SHADOW_SAMPLES = 10;   // along the reach, closer together near the pixel

// height of the wall at a canvas position, css px. The texture is filtered, so a slab's
// edge reads as a ramp one texel wide that slides smoothly with the slab
float heightAt(vec2 px) {
  return texture(uWall, (px + uOrigin) / uWallSize).a * HEIGHT_SPAN - LOGO_DEPTH;
}

// height of the wall s css px from px towards the light. A sample on an edge's ramp would
// see the slab behind it as lower than it is, so this takes the higher of the sample and
// the texel one further along: the slab keeps its full height, the edge still eases
float heightAlong(vec2 px, float s, vec2 dir) {
  vec2 at = px + dir * s * uPixelRatio;
  return max(heightAt(at), heightAt(at + dir));
}

// soft shadow: march from height h0 at px towards the light and keep the smallest
// angular clearance (clearance over distance) of the wall above the ray. The samples sit
// at fixed distances, closer together near the pixel where the clearance is most
// sensitive, and the light's apparent size then turns the angle into a penumbra
float shadowAt(vec2 px, float h0) {
  vec2 dir = normalize(LIGHT.xy);
  float rise = LIGHT.z / length(LIGHT.xy); // how much the ray climbs per css px travelled
  float bias = 0.4;
  float angle = 1.0;
  for (int i = 1; i <= SHADOW_SAMPLES; i++) {
    float f = float(i) / float(SHADOW_SAMPLES);
    float s = SHADOW_REACH * f * sqrt(f);
    float clearance = h0 + s * rise + bias - heightAlong(px, s, dir);
    angle = min(angle, clearance / s);
    if (angle < -LIGHT_SIZE) break;
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
