import { candyShader } from "./candyShader";
import { sandShader } from "./sandShader";
import { simplexNoise } from "./simplexNoise";
import { patternFunctions } from "./patternFunctions";

export const fragmentShader = `
  uniform float time;
  uniform vec2 resolution;
  uniform float snakeRadius;
  uniform vec2 candyPosition;
  uniform float candyRadius;
  uniform float candyTime;
  //uniform vec3 candyColorBase;
  //uniform vec3 candyColorAccent;
  uniform int score;
  uniform sampler2D snakeTexture;

  const vec3 lightPos = vec3(0.5, 1.5, 5.);
  const vec3 specColor = vec3(1.0, 1.0, 1.0);
  
  ${simplexNoise}

  ${patternFunctions}


  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y; 
    vec2 texCoord = vec2(x, y);
    vec3 fragPos = vec3(x, y, 0.0);
    vec3 cameraPos = vec3(0.,0.,1.);

    //fragPos = vec3(gl_FragCoord);
    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 viewDir = normalize(cameraPos - fragPos);

    vec3 texNorm = normalize(vec3(0.0, 0.0, 1.0));

    /**** CANDY ****/

    setPatternFromTime(candyTime);
    ${candyShader}

    /**** SNAKE ****/
    vec2 head = texture2D(snakeTexture, vec2(0.0, 0.5)).xy;
    vec3 snakeColor = vec3(1.0, 0.3, 0.3) * step(length(head - vec2(x, y)), snakeRadius);


    /**** SAND ****/
    ${sandShader}

    // FINAL MIX
    vec3 notBGColors = snakeColor + candyColor;
    //en dålig metod för bakgrund, nu blir allt som är perfekt vitt genomskingligt istället
    backgroundColor = backgroundColor * step(length(notBGColors), 0.0); 
    // backgroundColor = texture2D(snakeTexture, texCoord).xyz;
    vec3 finalColor = backgroundColor + notBGColors;
                        
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
