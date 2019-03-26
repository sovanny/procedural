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
      float candyTime = snakeLink.z;
      float size = snakeLink.a;
      vec2 linkDirection = normalize(snakeLinkPositionPrev - snakeLinkPosition);

      if (length(snakeColor) < 0.2) {
        snakeColor = snakeColor + vec3(linkDirection, sin(candyTime) * 0.5 + 0.5) * step(length(snakeLinkPosition - vec2(x, y)), size);
      }
    }
  }
`