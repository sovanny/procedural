import * as THREE from 'three'
import { fragmentShader } from './shaders/fragmentShader'
import { vertexShader } from './shaders/vertexShader'
export class Scene {

  private _scene = new THREE.Scene()
  private _container: HTMLElement
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.WebGLRenderer
  private _axis: THREE.AxesHelper
  private _light: THREE.DirectionalLight
  private _material: THREE.ShaderMaterial
  private _geometry: THREE.PlaneGeometry
  private _box: THREE.Mesh
  private _uniforms : any
  constructor() {
    this._renderer = new THREE.WebGLRenderer()
    this._axis = new THREE.AxesHelper(10)
    this._light = new THREE.DirectionalLight(0xffffff, 1.0)
    this._geometry = new THREE.PlaneGeometry(2, 1)
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this._uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() 
    }
  }
    this._material = new THREE.ShaderMaterial({ 
      uniforms: this._uniforms,
      vertexShader,
      fragmentShader,
    })
    this._material.wireframe = true;
    this._box = new THREE.Mesh(this._geometry, this._material)
  }

  public setup = () => {
    this._container = document.getElementById('container')
    this._container.appendChild(this._renderer.domElement)
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight)
    this._light.position.set(100, 100, 100)
    this._scene.add(this._axis)
    this._scene.add(this._light)
    this._scene.add(this._box)
    this._camera.position.z = 1

  }

  public render = () => {
    requestAnimationFrame(this.render)
    const timer = 0.002 * Date.now()
    //this._box.position.y = 0.1 + 0.15 * Math.sin(timer)
    //this._box.rotation.x += 0.01
    this._uniforms.time.value = timer
    this._renderer.render(this._scene, this._camera)
  }
}

