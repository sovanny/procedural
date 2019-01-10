
export interface Input {
  left?: boolean
  up?: boolean
  right?: boolean
  down?: boolean
  space?: boolean
}

const LEFT = 37
const UP = 38
const RIGHT = 39// || 68
const DOWN = 40
const SPACE = 32

export class InputManager {

  private _input: Input
  
  constructor() { 
    this._input = { }
  }

  public setup = () => {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
  }

  public keyDown = (event: KeyboardEvent) => {
    if (event.keyCode == LEFT) { this._input.left = true }
    if (event.keyCode == UP) { this._input.up = true }
    if (event.keyCode == RIGHT) { this._input.right = true }
    if (event.keyCode == DOWN) { this._input.down = true }
    if (event.keyCode == SPACE) { this._input.space = true }
  }

  public keyUp = (event: KeyboardEvent) => {
    if (event.keyCode == LEFT) { this._input.left = false }
    if (event.keyCode == UP) { this._input.up = false }
    if (event.keyCode == RIGHT) { this._input.right = false }
    if (event.keyCode == DOWN) { this._input.down = false }
    if (event.keyCode == SPACE) { this._input.space = false }
  }

  public reset = () => {
    const keys = Object.keys(this._input)
    for (const key of keys) { this._input[key] = false }
  }

  get input() { return this._input }
}
