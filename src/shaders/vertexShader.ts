export const vertexShader = `
  uniform float time;
  uniform vec2 resolution;
  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * modelViewPosition;
  }
`