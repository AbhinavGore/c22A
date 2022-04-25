const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg,tower,towerImg,cannon
var angle,cannonBall,boat
var balls=[]
var boats=[]
var boatAnimation=[]
var boatSpritedata, boatSpritesheet;

function preload() {
  backgroundImg=loadImage("./assets/background.gif")
  towerImg=loadImage("./assets/tower.png")
  boatSpritedata = loadJSON("assets/boat/boat.json");
  boatSpritesheet = loadImage("assets/boat/boat.png");
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle=15
 options={
 isStatic:true

 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 tower=Bodies.rectangle(160,350,160,310,options)
 World.add(world,tower)
 cannon=new Cannon(180,110,130,100,angle)
 
 var boatFrames=boatSpritedata.frames
 for(var i=0;i<boatFrames.length ;i++){
   var pos= boatFrames[i].position
   var img=boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h)
   boatAnimation.push(img)
 }
}

function draw() {
  
  image (backgroundImg,0,0,1200,600)
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
 push ()
 imageMode(CENTER)
 image(towerImg,tower.position.x,tower.position.y,160,310)
 pop ()
  cannon.display() 
 showBoats()
  
 // cannonBall.display()
 for(var i=0;i<balls.length;i++){
    showCannonBalls(balls[i],i)
    collisionWithBoat(i)
 } 
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot()
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    cannonBall=new CannonBall(cannon.x,cannon.y)
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
     // ball.remove(index);
    }
  }
}
function showBoats(){
  if(boats.length>0){
     //in case there is at least 1 boat in the array
     if(boats[boats.length-1]===undefined || boats[boats.length-1].body.position.x<width-300){
       var positions = [-40,-60,-70,-20]
       var p = random (positions)
       boat=new Boat(width,height-100,170,170,p,boatAnimation)
       boats.push(boat)
     }
     for(var i=0;i<boats.length;i++){
       if(boats[i]){   //to check whether there is a boat at that index
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
        boats[i].display()
        boats[i].animate()
       }
     }
  }
  else{  //incase there are NO boats in the array
    boat=new Boat(width-79,height-60,170,170,-80,boatAnimation)
    boats.push(boat)
  }
}
function collisionWithBoat(index){
  for(var i =0;i<boats.length;i++){
    if(balls[index]!==undefined && boats[i]!==undefined){
      var collision =Matter.SAT.collides(balls[index].body,boats[i].body)   
      if(collision.collided){
        boats[i].remove(i)
        Matter.World.remove(world, balls[index].body);
        delete balls[index]
      }
    }
  }
}


//NOTES
arr1=[23,45,"hello",false,null]
console.log(arr1[2])
//                0                      1                 2
arr2=[ [23,45,"hello",false,null], ["yes",true], [3,65,342,12,29,99,0] ]
//      0  1     2      3    4        0    1      0  1  2   3  4  5 6
console.log(arr2[2][2])

//pos=[[x1,y1],[x2,y2],[x3,y3]....]
/*
arr2=[a,b,c,d,e,...]
to get total number of elements in the array: arr2.length
to get the LAST index number: Total elements-1
arr2[arr2.length-1]
to add elements to array: arrName.push(item)

Matter.SAT.collides(body1,body1)

if it collides, it returns true... Otherwise, false

 */