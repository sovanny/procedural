import { candyShader } from "./candyShader";

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

  const vec3 lightPos = vec3(1.0,2.0,2.0);
  const vec3 specColor = vec3(1.0, 1.0, 1.0);

  void main()	{
    float x = gl_FragCoord.x / resolution.x;
    float y = gl_FragCoord.y / resolution.y;

    vec3 fragPos = vec3(0.0, 0.0, 0.0);
    vec3 cameraPos = vec3(0.,0.,1.);

    vec3 lightDir = normalize(lightPos - fragPos);
    vec3 viewDir = normalize(cameraPos - fragPos);

    vec3 texNorm = vec3(0.0, 0.0, 9.0);

    ${candyShader}

    /**** SNAKE ****/
    vec3 snakeColor = vec3(1.0, 0.3, 0.3) * step(length(snakePosition - vec2(x, y)), snakeRadius);


    /**** BG    ****/
    vec3 backgroundColor = vec3(0.75, 0.7, 0.5);

    
    vec3 notBGColors = snakeColor + candyColor;
    //en dålig metod för bakgrund, nu blir allt som är perfekt vitt genomskingligt istället
    backgroundColor = backgroundColor * step(length(notBGColors), 0.0); 
    vec3 finalColor = backgroundColor + notBGColors;

    /**** normal mapping ****/

    vec3 ambient = 0.3 * finalColor;

    vec3 norm = normalize(texNorm * 2.0 - 1.0);
    float diffuse = max(dot(lightDir, norm), 0.0);
    vec3 reflectDir = reflect(-lightDir, norm);

    float lambertian = max(dot(lightDir,norm), 0.0);
    float specular = 0.0;

    if(lambertian > 0.0) {
       float specAngle = max(dot(reflectDir, viewDir), 0.0);
       specular = pow(specAngle, 4.0);
    }
    /*gl_FragColor = vec4(ambient +
                      lambertian*diffuse +
                      specular*specColor, 1.0);
                      */

    //gl_FragColor = vec4(diffuse * finalColor + ambient, 1.0);


    gl_FragColor = vec4(finalColor, 1.0);
  }
`