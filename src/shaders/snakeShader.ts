export const snakeShader = `
  vec2 snakeLinkPosition;
  vec2 snakeLinkPositionPrev;
  vec3 snakeColor = vec3(0.0, 0.0, 0.0);

  const int maxAmount = 50;
  for (int i = 0; i < maxAmount; i++) {
    if (i < int(numberOfLinks)) {
      float xCoord = float(i) / float(maxAmount) + 1.0 / float(maxAmount * 2);
      vec4 snakeLink = texture2D(snakeTexture, vec2(xCoord, 0.5)).rgba;
      snakeLinkPositionPrev = snakeLinkPosition;
      snakeLinkPosition = snakeLink.xy;
      float snakeTime = snakeLink.z;
      float size = snakeLink.a;
      vec2 linkDirection = normalize(snakeLinkPositionPrev - snakeLinkPosition);

      setPatternFromTime(snakeTime);
      cX = (x - snakeLinkPosition.x) / size;
      cY = (y - snakeLinkPosition.y) / size;

      if (length(snakeColor) < 0.2) {
        //snakeColor = snakeColor + vec3(linkDirection, sin(candyTime) * 0.5 + 0.5) * step(length(snakeLinkPosition - vec2(x, y)), size);
        
        /*** SPIRAL PATTERN ***/
        if(candyPattern == 0){
            float divides = candySegments;
            float minorNoise  = sin(pow(float(score), 2.0) + length(vec2(cX, cY)));

            float atanAngle = atan(cX , cY );
            float intensity = sin((atanAngle+ minorNoise)*divides);
        
            //float bulgeFactor = abs(intensity*candyRadius*0.05);
            float bulgeFactor = 0.;
            modifiedCandyRadius = candyRadius + bulgeFactor;
        
            candyR = candyColorBase.x + candyColorAccent.x*abs(floor(intensity));
            candyG = candyColorBase.y + candyColorAccent.y*abs(floor(intensity));
            candyB = candyColorBase.z + candyColorAccent.z*abs(floor(intensity));
        }
        /**** DOT PATTERN ****/
        else if(candyPattern == 1){        
            float stripes  = pow(sin(cX*candySegments) + sin(cY*candySegments), 2.0);

            candyR = candyColorBase.x + candyColorAccent.x*abs(floor(stripes));
            candyG = candyColorBase.y + candyColorAccent.y*abs(floor(stripes));
            candyB = candyColorBase.z + candyColorAccent.z*abs(floor(stripes));
        }
        /**** WAVE PATTERN ****/
        else if(candyPattern == 2){        
            float stripes  = pow(sin(cX*candySegments) + sin(cY*5.0)*0.2, 2.0);

            candyR = candyColorBase.x + candyColorAccent.x*abs(1. - floor(stripes + 0.5));
            candyG = candyColorBase.y + candyColorAccent.y*abs(1. - floor(stripes + 0.5));
            candyB = candyColorBase.z + candyColorAccent.z*abs(1. - floor(stripes + 0.5));
        }
        /**** CHECKER PATTERN ****/
        else if(candyPattern == 3){        
            float stripes  = sin(cX*candySegments) + sin(cY*candySegments);

            candyR = candyColorBase.x + candyColorAccent.x*abs(stripes);
            candyG = candyColorBase.y + candyColorAccent.y*abs(stripes);
            candyB = candyColorBase.z + candyColorAccent.z*abs(stripes);        
        }
        snakeColor = vec3(candyR, candyG, candyB)* step(length(snakeLinkPosition - vec2(x, y)), size);
        /*** if head ***/
        if(i == 0){
          snakeColor = vec3(232.0/255.0, 90.0/255.0, 79.0/255.0) * step(length(snakeLinkPosition - vec2(x, y)), size);
        }
      }
    }
  }
`