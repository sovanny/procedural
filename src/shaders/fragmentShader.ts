export const fragmentShader = `
  #ifdef GL_ES
  precision highp float;
  #endif
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 snakePosition;
  uniform float snakeRadius;
  uniform vec2 candyPosition;
  uniform float candyRadius;
  uniform vec3 candyColorBase;
  uniform vec3 candyColorAccent;
  uniform int score;

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;

    /**** CANDY ****/
    float candyR, candyG, candyB;
    
    float cX = (x - candyPosition.x) / candyRadius;
    float cY = (y - candyPosition.y) / candyRadius;

    float divides = 8.0;
    float minorNoise  = sin(pow(float(score), 2.0) + length(vec2(cX, cY)));

    float atanAngle = atan(cX , cY );
    float intensity = abs(floor(sin((atanAngle+ minorNoise)*divides)));

    candyR = candyColorBase.x + candyColorAccent.x*intensity;
    candyG = candyColorBase.y + candyColorAccent.y*intensity;
    candyB = candyColorBase.z + candyColorAccent.z*intensity;

    //vec3 candyColor = vec3(0.3, 1.0, 1.0) * step(length(candyPosition - vec2(x, y)), candyRadius);
    vec3 candyColor = vec3(candyR, candyG, candyB)* step(length(candyPosition - vec2(x, y)), candyRadius);;



    /**** SNAKE ****/
    vec3 snakeColor = vec3(1.0, 0.3, 0.3) * step(length(snakePosition - vec2(x, y)), snakeRadius);


    /**** BG    ****/
    vec3 backgroundColor = vec3(0.75, 0.7, 0.5);

    
    vec3 notBGColors = snakeColor + candyColor;
    //en dålig metod för bakgrund, nu blir allt som är perfekt vitt genomskingligt istället
    backgroundColor = backgroundColor * step(length(notBGColors), 0.0); 
    gl_FragColor = vec4(backgroundColor + notBGColors, 1.0);
  }
`