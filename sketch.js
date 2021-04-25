var hypnoticBall,database,position;
var foodStock = 20

function preload(){
dog = loadImage("dogImg.png")
happy = loadImage("dogImg1.png")
}

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    hypnoticBall = createSprite(250,200,10,10);
    hypnoticBall.shapeColor = "red";
    hypnoticBall.addImage("dog1",dog)
    hypnoticBall.scale = 0.1
    ball = createSprite(200,5000,10,10)
    ball.addImage("smile",happy)
    ball.scale = 0.1
    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value",readPosition,showError);
   // console.log(foodStock)
}

function draw(){
    background(46, 139, 87);
    fill("white")
    textSize(15)
    text("Food remaining: "+foodStock,(width/2) - 50,30)
    //if(position !== undefined){

    //}
if(foodStock <= 0){
  foodStock = 0
}

    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);

    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    if(keyWentDown(UP_ARROW) && foodStock > 0){
        writePosition(0,-1);
        foodStock = foodStock - 1
        //hypnoticBall.changeImage(happy)
        hypnoticBall.visible = false
        ball.y = hypnoticBall.y
        ball.x = hypnoticBall.x
    }
    else{
      hypnoticBall.visible = true
ball.y = 5000

    }
  //  else if(keyDown(DOWN_ARROW)){
    //    writePosition(0,+1);
    //} 
    //textMode(CENTER)
    drawSprites();
//}
}


function readPosition(data){
    position = data.val();
    console.log(position.x);
    hypnoticBall.x = position.x
    hypnoticBall.y = position.y
}
function writePosition(x,y){
    database.ref('world/position').set({
        'x':position.x + x,
        'y':position.y + y
    })

}
function showError(){
    console.log("error")
}