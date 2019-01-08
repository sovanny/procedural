import * as THREE from 'three'
export class Scene {

  private _scene = new THREE.Scene()
  private _camera: THREE.PerspectiveCamera
  private _renderer: THREE.WebGLRenderer
  private _axis: THREE.AxesHelper
  private _light: THREE.DirectionalLight
  private _material: THREE.ShaderMaterial
  private _geometry: THREE.BoxGeometry
  private _box: THREE.Mesh
  private _uniforms : any


  constructor() {
    this._renderer = new THREE.WebGLRenderer()
    this._axis = new THREE.AxesHelper(10)
    this._light = new THREE.DirectionalLight(0xffffff, 1.0)
    this._geometry = new THREE.BoxGeometry(1, 1, 1)
    this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    //this._material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, wireframe: true})
    this._uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() }
  };
    this._material = new THREE.ShaderMaterial({ 
      uniforms: this._uniforms,
    
      vertexShader: document.getElementById( 'vertexShader' ).textContent,
    
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    
    })
    this._box = new THREE.Mesh(this._geometry, this._material)

  }

  public setup = () => {
    document.body.appendChild(this._renderer.domElement)
    this._renderer.setSize(window.innerWidth, window.innerHeight)
    this._light.position.set(100, 100, 100)
    this._box.position.x = 0.5
    this._box.rotation.y = 0.5
    this._scene.add(this._axis)
    this._scene.add(this._light)
    this._scene.add(this._box)
    this._camera.position.x = 5
    this._camera.position.y = 5
    this._camera.position.z = 5
    this._camera.lookAt(this._scene.position)
  }

  public render = () => {
    requestAnimationFrame(this.render)
    const timer = 0.002 * Date.now()
    this._box.position.y = 0.1 + 0.15 * Math.sin(timer)
    this._box.rotation.x += 0.01
    this._uniforms.time.value = timer
    this._renderer.render(this._scene, this._camera)
  }
}

