export class Score{

    private _candiesEaten: number
    private _highScore: number
    private _currentScoreBoard: HTMLElement
    private _highScoreBoard: HTMLElement

    constructor(){
        this._candiesEaten = 0
        this._highScore = 0
        this._currentScoreBoard = document.getElementById('current-score')
        this._highScoreBoard = document.getElementById('high-score')
        this.updateScoreBoard()
    }

    public eatCandy = () => {
        this.candiesEaten += 1
        if(this.candiesEaten > this.highScore) this.highScore = this.candiesEaten
        this.updateScoreBoard()
    }
    private updateScoreBoard = () =>{
        this._currentScoreBoard.innerHTML = this.candiesEaten.toString()
        this._highScoreBoard.innerHTML = 'High Score: ' + this.highScore.toString()
    }

    set candiesEaten(c: number){ this._candiesEaten =c}
    get candiesEaten() { return this._candiesEaten } 

    set highScore(c: number){ this._highScore =c}
    get highScore() { return this._highScore } 
}