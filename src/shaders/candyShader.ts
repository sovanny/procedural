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
    
        //vec3 candyColor = vec3(0.3, 1.0, 1.0) * step(length(candyPosition - vec2(x, y)), candyRadius);
        candyColor = vec3(candyR, candyG, candyB)* step(candyDist, modifiedCandyRadius);
    }
    else if(candyPattern == 1){
        candyColor = vec3(0.3, 1.0, 1.0) * step(candyDist, candyRadius);
        //int nPredefinedDots = 6;
        float dotRadius = 0.006;
        //int nDots = int(candySegments); 
        int nDots = 3;
        vec2 dotPositions[6];
        float noisePosX, noisePosY;
        vec2 tempPos;
        
        //give the dots random positions
        for(int i = 0; i < 6; i++){
            if(i < nDots){
                noisePosX = snoise(vec3(candyTime + float(i), score, 8.0))*candyRadius;
                noisePosY = snoise(vec3(score, candyTime + float(i), 8.0))*candyRadius;
                tempPos = vec2(candyPosition.x + noisePosX, candyPosition.y + noisePosY);
                dotPositions[i] = tempPos;
                
            }
        }
        bool ok;

        for(int i = 0; i < 6; i++){
            if(i < nDots){

                float distFromThisDot = length(dotPositions[i] - vec2(x,y));
                ok = false;
                for(int j = 0; j < 6; j++){
                    float distFromOtherDot = length(dotPositions[j] - vec2(x,y));
                    if(distFromThisDot < dotRadius && distFromOtherDot > (dotRadius*3.0)){
                        ok = true;
                    }else{
                        ok = false;
                    }
                }
                if(ok == true){
                    candyColor = vec3(0.1, 0.2, 0.3);
                }
                
            }
        }
        
    }
   

    float normDist = candyDist/(candyRadius);
    float offsetX =1./resolution.x;
    float offsetY = 1./resolution.y;

    /*
    if(candyDist < modifiedCandyRadius){ 

        texNorm = vec3(1. - pow(normDist, 16.0));
        vec3 a = vec3(x, y, texNorm);

        float xo = x + offsetX;
        float yo = y + offsetY;

        candyDist = length(candyPosition - vec2(xo, y));
        normDist = candyDist/(modifiedCandyRadius);
        texNorm = vec3(1. - pow(normDist, 16.0));
        vec3 b = vec3(xo, y, texNorm);

        candyDist = length(candyPosition - vec2(x, yo));
        normDist = candyDist/(modifiedCandyRadius);
        texNorm = vec3(1. - pow(normDist, 16.0));
        vec3 c = vec3(x, yo, texNorm);
        
        texNorm =normalize(cross((b-a),(c-a)));

        // normal mapping 

        vec3 normal = texNorm;
        vec3 vertPos = fragPos;
        
        float lambertian = max(dot(lightDir,normal), 0.0);
        float specular = 0.0;
    
        if(lambertian > 0.0) {
    
          vec3 reflectDir = reflect(-lightDir, normal);
          vec3 viewDir = normalize(-vertPos);
    
          float specAngle = max(dot(reflectDir, viewDir), 0.0);
          specular = pow(specAngle, 4.0);
    
    
        }
        candyColor = candyColor*0.4 + lambertian*candyColor + specular*specColor;  
    

    }
*/

    



`