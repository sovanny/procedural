import * as THREE from 'three'
import { Input } from './InputManager';
export class Snake {

  private _position: THREE.Vector2
  private _direction: THREE.Vector2
  private _speed: number
  private _turningSpeed: number
  private _radius: number
 
  constructor() {
    this._position = new THREE.Vector2(0.5, 0.5)
    this._direction = new THREE.Vector2(1.0, 0.0)
    this._radius = 0.03
  }

  public setup = () => {
    this._speed = 0.2
    this._turningSpeed = 4.0
  }

  public move = (timeBetweenFrames: number, input: Input) => {
    // if (input.left) { this._direction.rotateAround(this._position, this._turningSpeed * timeBetweenFrames) }
    // else if (input.right) { this._direction.rotateAround(this._position, -this._turningSpeed * timeBetweenFrames) }
    if (input.left) { this.direction.x === 1 ? null : this._direction.set(-1, 0) }
    if (input.up) { this.direction.y === -1 ? null : this._direction.set(0, 1) }
    if (input.right) { this.direction.x === -1 ? null : this._direction.set(1, 0) }
    if (input.down) { this.direction.y === 1 ? null : this._direction.set(0, -1) }
    
    this._position.add(this._direction.normalize().clone().multiplyScalar(this._speed * timeBetweenFrames))

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
  get radius() { return this._radius }
}

