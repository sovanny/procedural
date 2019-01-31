export const patternFunctions = `


  const int numberOfColorSchemes = 4;
  vec3 candyColorBase;
  vec3 candyColorAccent;
  float candySegments;
  int candyPattern; 

  int getCandyPattern(int ind){
    //spiral
    if(ind < 2){
      return 0;
    }
    //randig
    else{
      return 1;
    }
  }
  
  vec3 getCandyColor(const int ind){
    vec3 colorSchemesCandy[numberOfColorSchemes*2];
    colorSchemesCandy[0] = vec3(0.3, 0.43, 0.12);     //watermelon  base
    colorSchemesCandy[1] = vec3(0.16, 0.16, 0.06);    //watermelon accent
    colorSchemesCandy[2] = vec3(0.999, 0.999, 0.999); //red polka base
    colorSchemesCandy[3] = vec3(0.0, -.999, -.999);   //red polka accent 
    colorSchemesCandy[4] = vec3(0.999, 0.999, 0.999); //yellow polka base
    colorSchemesCandy[5] = vec3(0.0, -.3, -.8);       //yellow polka accent
    colorSchemesCandy[6] = vec3(0.999, 0.999, 0.999); //blue polka base
    colorSchemesCandy[7] = vec3(-.7, -.6, -.1);       //blue polka accent

    for (int i=0; i<numberOfColorSchemes*2; i++) {
      if (i == ind) return colorSchemesCandy[i];
    }
  }

  float getSegments(float t){
    int r = int(floor(mod(t, 3.)));
    if(r == 0){
      return 5.0;
    }
    else if(r == 1){
      return 8.0;
    }
    else if(r == 2){
      return 11.0;
    }
  }
 

  void setPatternFromTime(float t){
    //skapar ett index baserat på decimalen i time
    int index = int( floor( (((ceil(t) - t) * 10.))/float(numberOfColorSchemes-1) + 0.5 ) );
    //index = max(float(index), mod(numberOfColorSchemes,index));

    candyColorBase = getCandyColor(index*2);
    candyColorAccent = getCandyColor(index*2 + 1);
    candySegments = getSegments(t);
    candyPattern = getCandyPattern(index);

  }
  
  `