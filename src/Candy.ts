import * as THREE from 'three'

export class Candy {

  private _position: THREE.Vector2
  private _radius: number
  private _candyTime: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._radius = 0.025
    this._candyTime = 0.0;
  }

  public setup = () => {
    this.setRandPosition(0+this.radius, new THREE.Vector2(0.4, 0.4), new THREE.Vector2(0.6, 0.6), 1-this.radius)
  }

  public spawn = (snakePosition: THREE.Vector2, time: number) => {
    let excludeLower = snakePosition.subScalar(0.2);
    let excludeUpper = snakePosition.addScalar(0.2);
    this.setRandPosition(0+this.radius, excludeLower, excludeUpper, 1-this.radius);
    this.candyTime = time;
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

  //set position(p: THREE.Vector2) { this._position = p } 
  set radius(r: number){ this._radius = r}
  set candyTime(t: number){this._candyTime = t}

  
  get position() { return this._position } 
  get radius() {return this._radius}
  get candyTime(){return this._candyTime}
}

