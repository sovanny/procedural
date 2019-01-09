import * as THREE from 'three'
import { fragmentShader } from './shaders/fragmentShader'
import { vertexShader } from './shaders/vertexShader'
import { Snake } from './Snake';

const secondsOnMillisecond = 0.001 

export class Scene {

  private _scene = new THREE.Scene()
  private _container: HTMLElement
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.WebGLRenderer
  private _material: THREE.ShaderMaterial
  private _geometry: THREE.PlaneGeometry
  private _box: THREE.Mesh
  private _uniforms : any
  private _createdAt: Date
  private _resolution: THREE.Vector2
  private _snake: Snake

  constructor(width: number, height: number) {
    this._resolution = new THREE.Vector2(width, height)
    this._renderer = new THREE.WebGLRenderer()
    this._camera = new THREE.PerspectiveCamera(53.1, 1, 0.1, 2)
    this._geometry = new THREE.PlaneGeometry(1, 1)
    this._snake = new Snake()
    this._uniforms = {
      time: { type: "f", value: 0.0 },
      resolution: { type: "v2", value: this._resolution},
      snakePosition: { type: "v2", value: this._snake.position},
    }
    this._material = new THREE.ShaderMaterial({ 
      uniforms: this._uniforms,
      vertexShader,
      fragmentShader,
    })
    this._box = new THREE.Mesh(this._geometry, this._material)
    this._createdAt = new Date()
  }

  public setup = () => {
    this._container = document.getElementById('container')
    this._container.appendChild(this._renderer.domElement)
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight)
    this._scene.add(this._box)
    this._camera.position.z = 1
    document.getElementById('container').style.width = `${this._resolution.x}px`
    document.getElementById('container').style.height = `${this._resolution.y}px`
    this._snake.setup()
    document.addEventListener('keydown', this.keyboardInput);
  }

  public render = () => {
    const seconds = secondsOnMillisecond * (Date.now() - this._createdAt.getTime())
    this._uniforms.time.value = seconds
    this._renderer.render(this._scene, this._camera)
    requestAnimationFrame(this.render)
    this._snake.move(seconds)
  }
  
  public keyboardInput = (event: KeyboardEvent) => {
    const LEFT = 37
    const UP = 38
    const RIGHT = 39
    const DOWN = 40
    const SPACE = 32

    if (event.keyCode == LEFT) {
      this._snake.direction.set(-1, 0);
    }
    else if (event.keyCode == RIGHT) {
      this._snake.direction.set(1, 0);
    }
    else if (event.keyCode == UP) {
      this._snake.direction.set(0, 1);
    }
    else if (event.keyCode == DOWN) {
      this._snake.direction.set(0, -1);
    }
    else if (event.keyCode == SPACE) {
      this._snake.direction.set(0, 0);
    }
  }

}

