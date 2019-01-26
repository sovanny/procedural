import { candyShader } from "./candyShader";

export const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform vec2 snakePosition;
  uniform float snakeRadius;
  uniform vec2 candyPosition;
  uniform float candyRadius;
  uniform float candyTime;
  //uniform vec3 candyColorBase;
  //uniform vec3 candyColorAccent;
  uniform int score;

  const vec3 lightPos = vec3(0.5, 1.5, 5.);
  const vec3 specColor = vec3(1.0, 1.0, 1.0);
  const int numberOfColorSchemes = 4;
  vec3 candyColorBase;
  vec3 candyColorAccent;
  float candySegments;

  vec3 getCandyColor(const int ind){
    vec3 colorSchemesCandy[numberOfColorSchemes*2];
    colorSchemesCandy[0] = vec3(0.3, 0.43, 0.12);     //watermelon  base
    colorSchemesCandy[1] = vec3(0.16, 0.16, 0.06);    //watermelon accent
    colorSchemesCandy[2] = vec3(0.999, 0.999, 0.999); //red polka base
    colorSchemesCandy[3] = vec3(0.0, -.999, -.999);   //red polka accent 
    colorSchemesCandy[4] = vec3(0.999, 0.999, 0.999); //yellow polka base
    colorSchemesCandy[5] = vec3(0.0, -.3, -.8);       //yellow polka accent
    colorSchemesCandy[6] = vec3(0.999, 0.999, 0.999); //blue polka base
    colorSchemesCandy[7] = vec3(-.7, -.6, -.1);       //blue polka accent

    for (int i=0; i<numberOfColorSchemes*2; i++) {
      if (i == ind) return colorSchemesCandy[i];
    }
  }

  float getSegments(float t){
    int r = int(floor(mod(t, 3.)));
    if(r == 0){
      return 5.0;
    }
    else if(r == 1){
      return 8.0;
    }
    else if(r == 2){
      return 11.0;
    }
  }
 

  void setPatternFromTime(float t){
    int index = int( floor( (((ceil(t) - t) * 10.))/float(numberOfColorSchemes-1) + 0.5 ) );
    //index = max(float(index), mod(numberOfColorSchemes,index));

    candyColorBase = getCandyColor(index*2);
    candyColorAccent = getCandyColor(index*2 + 1);
    candySegments = getSegments(t);

  }

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;

    setPatternFromTime(candyTime);

    vec3 fragPos = vec3(x, y, 0.0);
    vec3 cameraPos = vec3(0.,0.,1.);

    //fragPos = vec3(gl_FragCoord);
    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 viewDir = normalize(cameraPos - fragPos);

    float texValue = 0.0;
    vec3 texNorm = normalize(vec3(0.0, 0.0, 1.0));

    ${candyShader}

  

   
    /**** SNAKE ****/
    vec3 snakeColor = vec3(1.0, 0.3, 0.3) * step(length(snakePosition - vec2(x, y)), snakeRadius);


    /**** BG    ****/
    vec3 backgroundColor = vec3(0.75, 0.7, 0.5);

    
    vec3 notBGColors = snakeColor + candyColor;
    //en dålig metod för bakgrund, nu blir allt som är perfekt vitt genomskingligt istället
    backgroundColor = backgroundColor * step(length(notBGColors), 0.0); 
    vec3 finalColor = backgroundColor + notBGColors;
                        
    gl_FragColor = vec4(finalColor, 1.0);
  }
`