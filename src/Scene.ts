import * as THREE from 'three'

import { Candy } from './Candy'
import { Input, InputManager } from './InputManager'
import { Score } from './Score'
import { fragmentShader } from './shaders/fragmentShader'
import { vertexShader } from './shaders/vertexShader'
import { Snake } from './Snake'

const secondsOnMillisecond = 0.001

export class Scene {

  private _scene = new THREE.Scene
  private _container: HTMLElement
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.WebGLRenderer
  private _material: THREE.ShaderMaterial
  private _geometry: THREE.PlaneGeometry
  private _plane: THREE.Mesh
  private _uniforms: any
  private _createdAt: Date
  private _secondsCurrentFrame: number
  private _secondsLastFrame: number
  private _frameTime: number
  private _resolution: THREE.Vector2
  private _snake: Snake
  private _candy: Candy
  private _inputManager: InputManager
  private _eatCandyDistance: number
  private _score: Score
  private _sceneTexture: THREE.Scene
  private _renderTarget: THREE.WebGLRenderTarget
  private _textureData: Float32Array

  constructor(width: number, height: number) {
    this._resolution = new THREE.Vector2(width, height)
    this._textureData = new Float32Array(16)

    this._scene = new THREE.Scene()
    this._sceneTexture = new THREE.Scene()
    this._camera = new THREE.PerspectiveCamera(53.1, this._resolution.x / this._resolution.y, 0.1, 2)
    this._renderer = new THREE.WebGLRenderer()
    this._geometry = new THREE.PlaneGeometry(1, 1)
    this._snake = new Snake()
    this._candy = new Candy()
    this._score = new Score()
    this._inputManager = new InputManager()
    this._renderTarget = new THREE.WebGLRenderTarget( this._resolution.x, this._resolution.y, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter})
   
    this._uniforms = {
      time: { type: "f", value: 0.0 },
      resolution: { type: "v2", value: this._resolution },
      snakeRadius: { type: "f", value: this._snake.radius },
      candyPosition: { type: "v2", value: this._candy.position },
      candyRadius: { type: "f", value: this._candy.radius },
      score: { type: "i", value: this._score.candiesEaten},
      snakeTexture: { type: "t", value: this._snake.positionTexture},
      candyTime: { type: "f", value: 0.1}, 
    }
    this._material = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader,
      fragmentShader,
    })
    this._plane = new THREE.Mesh(this._geometry, this._material)
    this._createdAt = new Date()
  }

  public setup = () => {
    this._container = document.getElementById('container')
    this._container.style.width = `${this._resolution.x}px`
    this._container.style.height = `${this._resolution.y}px`
    this._container.appendChild(this._renderer.domElement)
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight)
    this._scene.add(this._plane)
    this._sceneTexture.add(this._plane.clone())
    this._secondsLastFrame = 0
    this._secondsCurrentFrame = 0
    this._frameTime = 0
    this._camera.position.z = 1
    this._snake.setup()
    this._candy.setup()
    this._inputManager.setup()
    this._eatCandyDistance = this._candy.radius + this._snake.radius
  }

  public render = () => {
   
    const input: Input = this._inputManager.input
    this._secondsCurrentFrame = secondsOnMillisecond * (Date.now() - this._createdAt.getTime())
    this._frameTime = this._secondsCurrentFrame - this._secondsLastFrame
  
    this._uniforms.time.value = this._secondsCurrentFrame
    this._uniforms.snakeTexture.value = this._snake.positionTexture
    // console.log(this._textureData)
    // this._renderer.render(this._sceneTexture, this._camera, this._renderTarget, true)
    // this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._resolution.x, this._resolution.y, this._textureData)
    
    this._snake.move(this._frameTime, input)
    this.checkCandyCollision(this._uniforms.time.value)
    this._renderer.render(this._scene, this._camera)
    this._secondsLastFrame = this._secondsCurrentFrame
    
    requestAnimationFrame(this.render)
  }

  public checkCandyCollision = (time: number) => {
    if (this._snake.position.distanceTo(this._candy.position) < this._eatCandyDistance) {
      this._candy.spawn(this._snake.position, this._frameTime)
      this._score.eatCandy()
      this._uniforms.candyTime.value = time
    }
  }
}

