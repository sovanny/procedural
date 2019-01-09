import * as THREE from 'three'
export class Snake {

  private _position: THREE.Vector2
  private _direction: THREE.Vector2
  private _speed: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._direction = new THREE.Vector2(0.5, 0.5)
    this._speed = 0.007
  }

  public setup = () => {

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

  get position() { return this._position } 
  get direction() { return this._direction } 
}

