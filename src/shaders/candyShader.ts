export const candyShader = `
    /**** CANDY ****/
    float candyR, candyG, candyB;

    float cX = (x - candyPosition.x) / candyRadius;
    float cY = (y - candyPosition.y) / candyRadius;
    float candyDist = length(candyPosition - vec2(x, y));

    float divides = candySegments;
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
    float offsetX =1./resolution.x;
    float offsetY = 1./resolution.y;

    /*
    if(candyDist < candyRadius + bulgeFactor){ 

        texNorm = vec3(1. - pow(normDist, 16.0));
        vec3 a = vec3(x, y, texNorm);

        float xo = x + offsetX;
        float yo = y + offsetY;

        candyDist = length(candyPosition - vec2(xo, y));
        normDist = candyDist/(candyRadius + bulgeFactor);
        texNorm = vec3(1. - pow(normDist, 16.0));
        vec3 b = vec3(xo, y, texNorm);

        candyDist = length(candyPosition - vec2(x, yo));
        normDist = candyDist/(candyRadius + bulgeFactor);
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