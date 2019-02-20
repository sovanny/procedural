export const sandShader = `

    float sandBaseNoise = (snoise(vec3(fragPos.x + startTime, 
            fragPos.y + startTime, startTime))+ 1.)/2.;
    vec3 sandBaseColor = vec3(0.75, 0.7, 0.5);

    sandBaseColor = sandBaseColor*0.5 + (sandBaseColor*max(sandBaseNoise, 0.5));
    //sandBaseColor = sandBaseColor*0.5 + randTime;
    float glimmerNoise = sandBaseNoise + snoise(vec3(x*8.0, y*4.0, 20.0));
    glimmerNoise = glimmerNoise*0.3 + snoise(vec3(x*16.0, y*8.0,200.0));
    glimmerNoise = glimmerNoise*0.15 + snoise(vec3(x*32.0, y*16.0, 500.0));

    vec3 glimmer = vec3(0.0);
    if( mod(ceil(glimmerNoise*1000.0), 3.14) == 0.0 ){
        glimmer = vec3(0.5, 0.8, 0.8);
    }

    vec3 backgroundColor = sandBaseColor + glimmer;

`