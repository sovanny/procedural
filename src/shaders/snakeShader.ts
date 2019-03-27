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
      cX = (x);
      cY = (y);

      if (length(snakeLinkPosition - vec2(x, y)) < size) {
        /*** if head ***/
        if(i == 0){
          snakeColor = vec3(232.0/255.0, 90.0/255.0, 79.0/255.0) * step(length(snakeLinkPosition - vec2(x, y)), size);
        }
        else{
          snakeColor = (candyColorAccent + candyColorBase) * step(length(snakeLinkPosition - vec2(x, y)), size);
        }
      }
    }
  }
`