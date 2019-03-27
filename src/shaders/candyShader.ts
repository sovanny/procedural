export const candyShader = `
    /**** CANDY ****/
    float candyR, candyG, candyB, modifiedCandyRadius;
    vec3 candyColor;

    float cX = (x - candyPosition.x) / candyRadius;
    float cY = (y - candyPosition.y) / candyRadius;
    float candyDist = length(candyPosition - vec2(x, y));

    /*** SPIRAL PATTERN ***/
    if(candyPattern == 0){
        float divides = candySegments;
        //byt ut till 
        float minorNoise  = sin(pow(float(score), 2.0) + length(vec2(cX, cY)));

        float atanAngle = atan(cX , cY );
        float intensity = sin((atanAngle+ minorNoise)*divides);
    
        //float bulgeFactor = abs(intensity*candyRadius*0.05);
        float bulgeFactor = 0.;
        modifiedCandyRadius = candyRadius + bulgeFactor;
    
        candyR = candyColorBase.x + candyColorAccent.x*abs(floor(intensity));
        candyG = candyColorBase.y + candyColorAccent.y*abs(floor(intensity));
        candyB = candyColorBase.z + candyColorAccent.z*abs(floor(intensity));
    
        candyColor = vec3(candyR, candyG, candyB)* step(candyDist, modifiedCandyRadius);
    }
    /**** DOT PATTERN ****/
    else if(candyPattern == 1){        
        float stripes  = pow(sin(cX*candySegments) + sin(cY*candySegments), 2.0);

        candyR = candyColorBase.x + candyColorAccent.x*abs(floor(stripes));
        candyG = candyColorBase.y + candyColorAccent.y*abs(floor(stripes));
        candyB = candyColorBase.z + candyColorAccent.z*abs(floor(stripes));
        candyColor = vec3(candyR, candyG, candyB)* step(candyDist, candyRadius);
    }
    /**** WAVE PATTERN ****/
    else if(candyPattern == 2){        
        float stripes  = pow(sin(cX*candySegments) + sin(cY*5.0)*0.2, 2.0);

        candyR = candyColorBase.x + candyColorAccent.x*abs(1. - floor(stripes + 0.5));
        candyG = candyColorBase.y + candyColorAccent.y*abs(1. - floor(stripes + 0.5));
        candyB = candyColorBase.z + candyColorAccent.z*abs(1. - floor(stripes + 0.5));
    
        candyColor = vec3(candyR, candyG, candyB)* step(candyDist, candyRadius);
    
    }
    /**** CHECKER PATTERN ****/
    else if(candyPattern == 3){        
        float stripes  = sin(cX*candySegments) + sin(cY*candySegments);

        candyR = candyColorBase.x + candyColorAccent.x*abs(stripes);
        candyG = candyColorBase.y + candyColorAccent.y*abs(stripes);
        candyB = candyColorBase.z + candyColorAccent.z*abs(stripes);
        candyColor = vec3(candyR, candyG, candyB)* step(candyDist, candyRadius);
    
    }

    float normDist = candyDist/(candyRadius);
    float offsetX =1./resolution.x;
    float offsetY = 1./resolution.y;

`