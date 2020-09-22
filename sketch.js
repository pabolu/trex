var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage;
var plant1, plant2, plant3, plant4, plant5, plant6;
var cloud,plant;
var gameState = "play";
var plantGroup,cloudGroup;
var restartImage,restart;
var score = 0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  plant1 = loadImage("obstacle1.png");
  plant2 = loadImage("obstacle2.png");
  plant3 = loadImage("obstacle3.png");
  plant4 = loadImage("obstacle4.png");
  plant5 = loadImage("obstacle5.png");
  plant6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  restart = createSprite(300,100,20,20)
  restart.addImage("restart",restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  plantGroup = new Group();
  
  cloudGroup = new Group();
}

function draw() {
  background(180);
  text("score "  + score,500,30);
  
  console.log(frameCount)
  if(gameState === "play"){
    score = score + 3
    if(keyDown("space")) {
    trex.velocityY = -10;
 }
    trex.velocityY = trex.velocityY + 0.8
    ground.velocityX = -2;
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
     clouds();
     plants();
    if(trex.isTouching(plantGroup)){
       gameState = "end";
       }
  }
  else if(gameState === "end"){
    ground.velocityX = 0;
    plantGroup.setVelocityXEach(0);
    plantGroup.setLifetimeEach(-1);
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    restart.visible = true;
  }
  
  
 if(mousePressedOver(restart)){
   gameState = "play";
   plantGroup.destroyEach();
   cloudGroup.destroyEach();
   trex.changeAnimation("running",trex_running);
   restart.visible = false;
   score = 0;
 }
  
 
  
  trex.collide(invisibleGround);
 
 
  drawSprites();
}
function clouds(){
  if(frameCount %80 === 0){
  cloud = createSprite(580,50,30,30);
  cloud.y = random(50,120);
  cloud.addImage(cloudImage);
  cloud.scale = 0.7;
  cloud.lifetime = 116  ;
  cloud.velocityX = -5;
  cloudGroup.add(cloud);
  }
}
function plants(){
  if(frameCount %90 === 0){
   plant = createSprite(580,170,30,30);
   var x = Math.round(random(1,6));
   switch(x){
     case 1:plant.addImage(plant1);
      break;
      case 2:plant.addImage(plant2);
       break;
       case 3:plant.addImage(plant3);
       break;
       case 4:plant.addImage(plant4);
       break;
       case 5:plant.addImage(plant5);
       break;
       case 6:plant.addImage(plant6);
       break;
       default:break;
   }
   plant.scale = 0.4 ;
   plant.lifetime = 116  ;
   plant.velocityX = -5;
   plantGroup.add(plant)
  }
}