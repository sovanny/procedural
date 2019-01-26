export const sandShader = `

    float sandBaseNoise = (snoise(fragPos) + 1.)/2.;
    vec3 sandBaseColor = vec3(0.75, 0.7, 0.5);

    sandBaseColor = sandBaseColor*0.5 + (sandBaseColor*max(sandBaseNoise, 0.5));
    float glimmerNoise = snoise(vec3(x*8.0, y*4.0, time*0.02));
    glimmerNoise = glimmerNoise*0.5 + snoise(vec3(x*16.0, y*8.0 + time*0.02, 0.0));
    glimmerNoise = glimmerNoise*0.2 + snoise(vec3(x*32.0, y*16.0, 0.0));

    vec3 glimmer = vec3(0.0);
    if(glimmerNoise > 0.95){
        glimmer = vec3(0.0, 0.8, 0.8);
    }

    vec3 backgroundColor = sandBaseColor + glimmer;

`