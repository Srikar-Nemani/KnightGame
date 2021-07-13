class Player{
    constructor(x,y){
        this.x = x;
        this.y=y;
        this.image = loadImage("archer-clipart-hunter-1.png");
        
    }
    display(){
        image(this.image,this.x,this.y,70,150);
    }
}