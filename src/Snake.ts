import * as THREE from 'three'
import { Input } from './InputManager'
import { Vector2 } from 'three'

const MAX_LINKS = 50
export interface SnakeLink {
  position: THREE.Vector2
  candyTime: number
  size: number
}
export class Snake {

  private _direction: THREE.Vector2
  private _speed: number
  private _turningSpeed: number
  private _radius: number
  private _standStill: boolean
  private _positionTexture: THREE.DataTexture
  private _positionData: Float32Array
  private _links: SnakeLink[]
  private _linkDistance: number

  constructor() {
    const headLink: SnakeLink = {
      position: new THREE.Vector2(0.5, 0.5),
      candyTime: 0,
      size: 0.01,
    }

    this.initPositionTexture()
    this._direction = new THREE.Vector2(1.0, 0.0)
    this._radius = 0.02
    this._standStill = false
    this._links = []
    this._links.push(headLink)
    this._linkDistance = 0.1
  }

  public setup = () => {
    this._speed = 0.4
    this._turningSpeed = 4.0
  }

  initPositionTexture = () => {
    const size = MAX_LINKS
    const RGBASize = 4
    this._positionData = new Float32Array(size * RGBASize)
    for (let i = 0; i < size; i++) {
      this._positionData[i * RGBASize] = i / size
      this._positionData[i * RGBASize + 1] = 0
      this._positionData[i * RGBASize + 2] = i / size
    }

    this._positionTexture = new THREE.DataTexture(this._positionData, size, 1, THREE.RGBAFormat, THREE.FloatType)
    this._positionTexture.needsUpdate = true
  }

  public move = (timeBetweenFrames: number, input: Input) => {
    if (input.left) { this.direction.x === 1 ? null : this._direction.set(-1, 0) }
    if (input.up) { this.direction.y === -1 ? null : this._direction.set(0, 1) }
    if (input.right) { this.direction.x === -1 ? null : this._direction.set(1, 0) }
    if (input.down) { this.direction.y === 1 ? null : this._direction.set(0, -1) }
    if (input.space) { this._standStill = !this._standStill }

    if (!this._standStill) {
      this._links[0].position.add(this._direction.normalize().clone().multiplyScalar(this._speed * timeBetweenFrames))
      this._positionData[0] = this.position.x
      this._positionData[1] = this.position.y
      this._positionData[2] = this._links[0].candyTime
      this._positionData[3] = this._links[0].size

      let linkIndex = 0
      let prevLink = this._links[0]
      for (const link of this._links) {
        if (linkIndex !== 0) {
          // calc direction to next link
          const distance: THREE.Vector2 = new THREE.Vector2(0, 0)
          const d = distance.subVectors(prevLink.position, link.position).length()
          link.position.add(distance.subVectors(prevLink.position, link.position).normalize().clone().multiplyScalar(this._speed * timeBetweenFrames * d * 40.0))
          // link.position.add(this._direction.normalize().clone().multiplyScalar(this._speed * timeBetweenFrames))

          // push link in this direction
          this._positionData[linkIndex * 4] = link.position.x
          this._positionData[linkIndex * 4 + 1] = link.position.y
          this._positionData[linkIndex * 4 + 2] = link.candyTime
          this._positionData[linkIndex * 4 + 3] = link.size
        }

        linkIndex++
        prevLink = link
      }
    }

    if (this.position.x < 0) { this.position.x = 1 }
    if (this.position.y < 0) { this.position.y = 1 }
    if (this.position.x > 1) { this.position.x = 0 }
    if (this.position.y > 1) { this.position.y = 0 }
  }

  public addLink = (candyTime: number) => {
    const lastLinkPosition = this._links[this._links.length - 1].position
    const factor = 0.003
    const minSize = 0.03
    this._links.push({
      position: new THREE.Vector2(lastLinkPosition.x, lastLinkPosition.y),
      candyTime,
      size: factor * (Math.sin(this._links.length) + 1) + minSize,
    })

    this._links.push({
      position: new THREE.Vector2(lastLinkPosition.x, lastLinkPosition.y),
      candyTime,
      size: factor * (Math.sin(this._links.length) + 1) + minSize,
    })

    this._links.push({
      position: new THREE.Vector2(lastLinkPosition.x, lastLinkPosition.y),
      candyTime,
      size: factor * (Math.sin(this._links.length) + 1) + minSize,
    })

    this._links.push({
      position: new THREE.Vector2(lastLinkPosition.x, lastLinkPosition.y),
      candyTime,
      size: factor * (Math.sin(this._links.length) + 1) + minSize,
    })
    //console.log(this._links)
  }

  set position(p: THREE.Vector2) { this._links[0].position = p }
  set direction(d: THREE.Vector2) { this._direction = d }
  set radius(r: number) { this._radius = r }

  get positionTexture() {
    this._positionTexture = new THREE.DataTexture(this._positionData, MAX_LINKS, 1, THREE.RGBAFormat, THREE.FloatType)
    this._positionTexture.needsUpdate = true
    return this._positionTexture
  }

  get numberOfLinks() { return this._links.length }
  get position() { return this._links[0].position }
  get direction() { return this._direction }
  get radius() { return this._radius }
}

