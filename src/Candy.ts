import * as THREE from 'three'

export class Candy {

  private _position: THREE.Vector2
  private _radius: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._radius = 0.02
  }

  public setup = () => {
    this.setRandPosition(0,1)
  }

  public spawn = (time: number, snakeSize: number, snakePosition: THREE.Vector2) => {
    this.setRandPosition(0,1);
  }

  private setRandPosition = (low: number, high: number) => {
    let x = THREE.Math.randFloat(low, high);
    let y = THREE.Math.randFloat(low, high);
    this._position.set(x, y);
  }

  //set position(p: THREE.Vector2) { this._position = p } 
  set radius(r: number){ this._radius = r}
  
  get position() { return this._position } 
  get radius() {return this._radius}
}

