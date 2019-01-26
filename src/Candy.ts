import * as THREE from 'three'

export class Candy {

  private _position: THREE.Vector2
  private _radius: number
  private _colorBase: THREE.Vector3
  private _colorAccent: THREE.Vector3
  private _colorSchemes: THREE.Vector3[]
  private _nColors: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._radius = 0.025
    this._colorBase = new THREE.Vector3(0.5, 0.5, 0.5)
    this._colorAccent =new THREE.Vector3(0.1, 0.1, 0.1)
    this._nColors = 4
    this._colorSchemes = new Array(this._nColors*2)
  }

  public setup = () => {
    this.setRandPosition(0+this.radius, new THREE.Vector2(0.4, 0.4), new THREE.Vector2(0.6, 0.6), 1-this.radius)
    this.setColors()
    this.newColorScheme(THREE.Math.randInt(0,this._nColors-1))
  }

  public spawn = (snakePosition: THREE.Vector2, time: number) => {
    let excludeLower = snakePosition.subScalar(0.2);
    let excludeUpper = snakePosition.addScalar(0.2);
    this.newColorScheme(THREE.Math.randInt(0,this._nColors-1))
    this.setRandPosition(0+this.radius, excludeLower, excludeUpper, 1-this.radius);
  }

  private setRandPosition = (low: number, exclLow: THREE.Vector2, exclHigh: THREE.Vector2, high: number) => {
    let x, y
    do {
        x = THREE.Math.randFloat(low, high);
    } while( x<exclLow.x && x>exclHigh.x)
    do {
        y = THREE.Math.randFloat(low, high);
    } while(y<exclLow.y && y>exclHigh.y)

    this._position.set(x, y);
  }

  private setColors = () => {
    // watermelon color
    this._colorSchemes[0] = new THREE.Vector3(0.3, 0.43, 0.12)  //base
    this._colorSchemes[1] = new THREE.Vector3(0.16, 0.16, 0.06) //accent

    // polka color  - classic red
    this._colorSchemes[2] = new THREE.Vector3(0.999, 0.999, 0.999)
    this._colorSchemes[3] = new THREE.Vector3(0.0, -.999, -.999)

    // polka color  - yellow
    this._colorSchemes[4] = new THREE.Vector3(0.999, 0.999, 0.999)
    this._colorSchemes[5] = new THREE.Vector3(0.0, -.3, -.8)

    // polka color  - blue
    this._colorSchemes[6] = new THREE.Vector3(0.999, 0.999, 0.999)
    this._colorSchemes[7] = new THREE.Vector3(-.7, -.6, -.1)
  }

  private newColorScheme = (i: number)  =>{
    i *= 2
    this.colorBase.set(this._colorSchemes[i].x, this._colorSchemes[i].y, this._colorSchemes[i].z)
    this.colorAccent.set(this._colorSchemes[i+1].x, this._colorSchemes[i+1].y, this._colorSchemes[i+1].z)
  }

  //set position(p: THREE.Vector2) { this._position = p } 
  set radius(r: number){ this._radius = r}
  set colorBase(c: THREE.Vector3){ this._colorBase = c }
  set colorAccent(c: THREE.Vector3){ this._colorAccent = c }

  
  get position() { return this._position } 
  get radius() {return this._radius}
  get colorBase() {return this._colorBase}
  get colorAccent() {return this._colorAccent}
  get colors() {return this._colorSchemes}
}

