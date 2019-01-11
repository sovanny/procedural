export const fragmentShader = `
  #ifdef GL_ES
  precision highp float;
  #endif
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 snakePosition;
  uniform float snakeRadius;
  //uniform float snakeSize;
  uniform vec2 candyPosition;
  uniform float candyRadius;

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;
    
    vec3 snakeColor = vec3(1.0, 0.3, 0.3) * step(length(snakePosition - vec2(x, y)), snakeRadius);
    vec3 candyColor = vec3(0.3, 1.0, 1.0) * step(length(candyPosition - vec2(x, y)), candyRadius);
    vec3 notBGColors = snakeColor + candyColor;
    vec3 backgroundColor = vec3(0.75, 0.7, 0.5);
    backgroundColor = backgroundColor * step(length(notBGColors), 0.0);
    gl_FragColor = vec4(backgroundColor + notBGColors, 1.0);
  }
`