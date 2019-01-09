export const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 snakePosition;

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;
    
    vec3 color = vec3(1.0, 0.0, 0.0);
    if ( length(snakePosition - vec2(x, y)) < 0.03 ) {
      color = vec3(0.0, 0.0, 0.0);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`