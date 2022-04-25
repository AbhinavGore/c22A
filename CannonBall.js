class CannonBall{
    constructor(x, y) 
    {
      var options = {
        isStatic: true
      };
      this.r = 30;
      this.trajectory = [];   //an empty array
      this.body = Bodies.circle(x, y, this.r, options);
      this.image = loadImage("./assets/cannonball.png");
      World.add(world, this.body);
    }
    display() 
    {
      var pos = this.body.position;
      push();
      imageMode(CENTER);
      image(this.image, pos.x, pos.y, this.r, this.r);
      pop();
      if(this.body.velocity.x>0 && this.body.position.x>220){ 
        //getting the current position of the cannonball
        var position = [pos.x, pos.y];
        //storing the position of the path followed by the cannonball
        this.trajectory.push(position)
      }
      for(var i=0;i<this.trajectory.length;i++){
          image (this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
      }

    }
    shoot(){
        var newAngle=cannon.angle-28
        newAngle=newAngle*(3.14/180)    //converting degree to radians
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body,{
            x: velocity.x *(180/3.14), y: velocity.y * (180/3.14)
        })

    }
}
/*
Steps for shoot:
○Store the angle of cannon in a variable velocity.
○ Multiply that value with 0.5 using mult().
○ Change the isStatic property of cannonBall to false, so that It can fall.
○ Set velocity using setVelocity() and velocity variables.

5 types of data: number, string, boolean, null, undefined
To store data we use variable.
Data structure: Arrays, JSON
      0   1    2     3     4
arr1=[23,45,"hello",false,null]
arr1[2]
       0   1   0   1   0   1
traj=[[x1,y1],[x2,y2],[x3,y3]....]

*/