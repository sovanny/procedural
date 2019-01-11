export const vertexShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 candyPosition;
  uniform float candyRadius;
  uniform vec3 candyColorBase;
  uniform vec3 candyColorAccent;
  void main() {
    float x = position.x / resolution.x;
    float y = position.y / resolution.y;
    /**** CANDY ****/
    vec3 newPosition = vec3(position.x, position.y, position.z+0.5)* step(length(candyPosition - vec2(x, y)), candyRadius);


    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * modelViewPosition;
  }
`