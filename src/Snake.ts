import * as THREE from 'three'
import { Input } from './InputManager'

const MAX_LINKS = 5

export class Snake {

  private _position: THREE.Vector2
  private _direction: THREE.Vector2
  private _speed: number
  private _turningSpeed: number
  private _radius: number
  private _standStill: boolean
  private _positionTexture: THREE.DataTexture
  private _positionData: Float32Array


  constructor() {
    this.initPositionTexture()
    this._position = new THREE.Vector2(0.5, 0.5)
    this._direction = new THREE.Vector2(1.0, 0.0)
    this._radius = 0.03
    this._standStill = false
  }

  public setup = () => {
    this._speed = 0.2
    this._turningSpeed = 4.0
  }

  initPositionTexture = () => {
    const size = MAX_LINKS
    this._positionData = new Float32Array(size * 3)
    for (let i = 0; i < size; i++) {
      this._positionData[i * 3] = i / size
      this._positionData[i * 3 + 1] = 0
      this._positionData[i * 3 + 2] = i / size
    }

    this._positionTexture = new THREE.DataTexture(this._positionData, size, 1, THREE.RGBFormat, THREE.FloatType)
    this._positionTexture.needsUpdate = true
  }

  public move = (timeBetweenFrames: number, input: Input) => {
    if (input.left) { this.direction.x === 1 ? null : this._direction.set(-1, 0) }
    if (input.up) { this.direction.y === -1 ? null : this._direction.set(0, 1) }
    if (input.right) { this.direction.x === -1 ? null : this._direction.set(1, 0) }
    if (input.down) { this.direction.y === 1 ? null : this._direction.set(0, -1) }
    if (input.space) { this._standStill = !this._standStill }

    if (!this._standStill) {
      this._position.add(this._direction.normalize().clone().multiplyScalar(this._speed * timeBetweenFrames))
    }

    this._positionData[0] = this.position.x 
    this._positionData[1] = this.position.y
    if (this.position.x < 0) { this.position.x = 1 }
    if (this.position.y < 0) { this.position.y = 1 }
    if (this.position.x > 1) { this.position.x = 0 }
    if (this.position.y > 1) { this.position.y = 0 }
  }

  set position(p: THREE.Vector2) { this._position = p }
  set direction(d: THREE.Vector2) { this._direction = d }
  set radius(r: number) { this._radius = r }

  get positionTexture() { 
    this._positionTexture = new THREE.DataTexture(this._positionData, MAX_LINKS, 1, THREE.RGBFormat, THREE.FloatType)
    this._positionTexture.needsUpdate = true


    return this._positionTexture
   }
  get position() { return this._position }
  get direction() { return this._direction }
  get radius() { return this._radius }
}

