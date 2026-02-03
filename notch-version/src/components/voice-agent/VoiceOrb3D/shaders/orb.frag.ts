export const orbFragmentShader = /* glsl */ `
// Uniforms
uniform float uTime;
uniform float uAudioLevel;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uFresnelPower;
uniform float uIridescence;
uniform float uGlassiness;
uniform int uStatus;

// Varyings
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying float vDisplacement;
varying float vFresnelFactor;

// Iridescence calculation (chromatic aberration effect)
vec3 iridescence(float angle, float intensity) {
  float hue = mod(angle * 0.5 + uTime * 0.1, 1.0);

  // HSV to RGB
  vec3 k = vec3(1.0, 2.0 / 3.0, 1.0 / 3.0);
  vec3 p = abs(fract(hue + k) * 6.0 - 3.0);
  vec3 rgb = clamp(p - 1.0, 0.0, 1.0);

  return mix(vec3(1.0), rgb, intensity);
}

// Gradient noise for surface detail
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  // Base color with subtle variation
  vec3 baseColor = uColor;

  // Color variation based on position
  float colorVariation = noise2D(vUv * 10.0 + uTime * 0.5) * 0.1;
  baseColor = mix(baseColor, uSecondaryColor, colorVariation);

  // Fresnel rim lighting
  float fresnel = pow(vFresnelFactor, uFresnelPower);
  vec3 rimColor = vec3(1.0);

  // Status-specific rim colors
  if (uStatus == 1) { // Listening - red pulsing rim
    float pulse = sin(uTime * 4.0) * 0.3 + 0.7;
    rimColor = vec3(1.0, 0.3, 0.3) * pulse;
  } else if (uStatus == 2) { // Processing - orange shimmer
    float shimmer = sin(uTime * 6.0 + vUv.x * 20.0) * 0.5 + 0.5;
    rimColor = vec3(1.0, 0.6, 0.2) * (0.8 + shimmer * 0.2);
  } else if (uStatus == 3) { // Speaking - green glow
    rimColor = vec3(0.3, 1.0, 0.5);
  } else if (uStatus == 4) { // Error - red glow
    float errorPulse = sin(uTime * 8.0) * 0.5 + 0.5;
    rimColor = vec3(1.0, 0.2, 0.2) * (0.7 + errorPulse * 0.3);
  }

  // Iridescence based on viewing angle
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);
  float viewAngle = dot(normalize(vNormal), viewDir);
  vec3 iridescentColor = iridescence(viewAngle, uIridescence);

  // Combine colors
  vec3 finalColor = baseColor;

  // Add iridescent sheen
  finalColor *= iridescentColor;

  // Add rim glow
  finalColor += rimColor * fresnel * (0.5 + uAudioLevel * 0.5);

  // Glass-like inner glow
  float innerGlow = smoothstep(0.0, 0.3, vDisplacement) * uGlassiness;
  finalColor += baseColor * innerGlow * 0.3;

  // Audio-reactive brightness boost
  finalColor *= 1.0 + uAudioLevel * 0.3;

  // HDR tone mapping
  finalColor = finalColor / (finalColor + vec3(1.0));

  // Alpha with fresnel-based edge fade
  float alpha = 0.7 + fresnel * 0.3;
  alpha *= 0.9 + noise2D(vUv * 5.0) * 0.1;

  gl_FragColor = vec4(finalColor, alpha);
}
`;
