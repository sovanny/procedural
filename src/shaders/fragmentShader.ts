export const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 snakePosition;
  uniform float snakeRadius;
  uniform vec2 candyPosition;
  uniform float candyRadius;

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;
    
    vec3 color = vec3(1.0, 0.0, 0.0);
    if ( length(snakePosition - vec2(x, y)) < snakeRadius ) {
      color = vec3(0.0, 0.0, 0.0);
    }else if ( length(candyPosition - vec2(x, y)) < candyRadius ) {
      color = vec3(0.0, 1.0, 1.0);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`