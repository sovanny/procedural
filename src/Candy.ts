import * as THREE from 'three'

export class Candy {

  private _position: THREE.Vector2
  private _radius: number
  private _color: THREE.Vector3
  private _colorSchemes: THREE.Vector3[]
  private _nColors: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._radius = 0.02
    this._color = new THREE.Vector3(0.5, 0.5, 0.5)
    this._nColors = 2
    this._colorSchemes = new Array(this._nColors)
  }

  public setup = () => {
    this.setRandPosition(0+this.radius, new THREE.Vector2(0.4, 0.4), new THREE.Vector2(0.6, 0.6), 1-this.radius)
    this.setColors()
    let newColor = (this._colorSchemes[THREE.Math.randInt(0,this._nColors-1)])
    this.color.set(newColor.x, newColor.y, newColor.z)
  }

  public spawn = (snakePosition: THREE.Vector2) => {
    let excludeLower = snakePosition.subScalar(0.2);
    let excludeUpper = snakePosition.addScalar(0.2);
    let newColor = (this._colorSchemes[THREE.Math.randInt(0,this._nColors-1)])
    this.color.set(newColor.x, newColor.y, newColor.z)
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
    this._colorSchemes[0] = new THREE.Vector3(0.3, 0.43, 0.12)
    // polka color
    this._colorSchemes[1] = new THREE.Vector3(1.0, 0.0, 0.0)
  }

  //set position(p: THREE.Vector2) { this._position = p } 
  set radius(r: number){ this._radius = r}
  set color(c: THREE.Vector3){ this._color = c }
  
  get position() { return this._position } 
  get radius() {return this._radius}
  get color() {return this._color}
  get colors() {return this._colorSchemes}
}

