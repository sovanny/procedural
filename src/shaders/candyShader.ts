export const candyShader = `
    /**** CANDY ****/
    float candyR, candyG, candyB;

    float cX = (x - candyPosition.x) / candyRadius;
    float cY = (y - candyPosition.y) / candyRadius;
    float candyDist = length(candyPosition - vec2(x, y));

    float divides = 8.0;
    float minorNoise  = sin(pow(float(score), 2.0) + length(vec2(cX, cY)));

    float atanAngle = atan(cX , cY );
    float intensity = sin((atanAngle+ minorNoise)*divides);

    float bulgeFactor = abs(intensity*candyRadius*0.05);

    candyR = candyColorBase.x + candyColorAccent.x*abs(floor(intensity));
    candyG = candyColorBase.y + candyColorAccent.y*abs(floor(intensity));
    candyB = candyColorBase.z + candyColorAccent.z*abs(floor(intensity));

    //vec3 candyColor = vec3(0.3, 1.0, 1.0) * step(length(candyPosition - vec2(x, y)), candyRadius);
    vec3 candyColor = vec3(candyR, candyG, candyB)* step(candyDist, candyRadius + bulgeFactor);

    float normDist = candyDist/(candyRadius + bulgeFactor);

    if(candyDist < candyRadius + bulgeFactor){ //ta bort if-sats
        texNorm = normalize( vec3( normDist ) );
        
    }



`