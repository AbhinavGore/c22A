class Cannon{
    constructor(x,y,width,height,angle){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.cannon_image = loadImage("assets/canon.png");
        this.cannon_base = loadImage("assets/cannonBase.png");
    }
    display(){
        if(keyIsDown(RIGHT_ARROW) && this.angle<70){
            this.angle+=1
        }
        if(keyIsDown(LEFT_ARROW)&& this.angle>-30){
            this.angle-=1
        }
        //create cannon top
        push()
        translate (this.x,this.y)
        rotate (this.angle)
        imageMode(CENTER)
        image  (this.cannon_image,0,0,this.width,this.height)
        pop ()
        
        //cannon bottom
        //rect(70,20,200,200)
        image (this.cannon_base,70,20,200,200)
        noFill()
    }
    remove(index){
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
        setTimeout(() => {
          Matter.World.remove(world, this.body);
          delete balls[index];
        }, 1000);
      }
}