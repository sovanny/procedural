import * as THREE from 'three'
export class Snake {

  private _position: THREE.Vector2
  private _direction: THREE.Vector2
  private _speed: number
  private _radius: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._direction = new THREE.Vector2(1.0, 0.0)
    this._radius = 0.03
  }

  public setup = () => {
    this._speed = 0.007
  }

  public move = (time: number) => {
    const direction = this.direction.clone().multiplyScalar(this._speed)
    this._position.add(direction)
    if (this.position.x < 0) { this.position.x = 1 }
    if (this.position.y < 0) { this.position.y = 1 }
    if (this.position.x > 1) { this.position.x = 0 }
    if (this.position.y > 1) { this.position.y = 0 }
  }

  set position(p: THREE.Vector2) { this._position = p } 
  set direction(d: THREE.Vector2) { this._direction = d }
  set radius(r: number){ this._radius = r}

  get position() { return this._position } 
  get direction() { return this._direction } 
  get radius() {return this._radius}

}

