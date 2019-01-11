export class Score{

    private _candiesEaten: number

    constructor(){
        this._candiesEaten = 0;
    }

    public eatCandy = () => {
        this.candiesEaten = 1;
    }

    set candiesEaten(c: number){ this._candiesEaten =c}
    get candiesEaten() { return this._candiesEaten } 
}