export const candyShader = `
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

    float candyDist = length(candyPosition - vec2(x, y));

    //vec3 candyColor = vec3(0.3, 1.0, 1.0) * step(length(candyPosition - vec2(x, y)), candyRadius);
    vec3 candyColor = vec3(candyR, candyG, candyB)* step(candyDist, candyRadius);

    float normDist = candyDist/candyRadius;

    if(candyDist < candyRadius){
        texNorm = normalize(vec3(normDist, normDist, normDist));
    }


`