var player, playerImg;
var bgImg, bg;
var castleImg, castle;
var invisG;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var obstacleGroup;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var gameover, gameoverImg;
var appleImg, grapeImg,apple,grape;
var foodGroup;
var score = 0;
var arrowImg, arrow;
var arrowGroup;

function preload(){
  bgImg = loadImage("backgroundimg.jpeg");
  castleImg = loadImage("castle-removebg-preview.png");
  playerImg = loadImage("archer-clipart-hunter-1.png");
  obstacle1 = loadImage("log-removebg-preview.png");
  obstacle2 = loadImage("rock-removebg-preview.png");
  obstacle3 = loadImage("wall-removebg-preview.png");
  obstacle4 = loadImage("dog.jpeg");
  obstacle5 = loadImage("lion.jpeg");
  obstacle6 = loadImage("horse.jpeg")
  gameoverImg = loadImage("gameover-removebg-preview.png");
  appleImg = loadImage("goldenapple-removebg-preview.png");
  grapeImg = loadImage("grapes-removebg-preview.png");
  arrowImg = loadImage("arrow-removebg-preview.png");
}
function setup(){
  var canvas = createCanvas(1200,800);
  bg = createSprite(600,400,1200,800);
  bg.velocityX = -4;
  bg.scale = 5;
  bg.addImage(bgImg);
  castle = createSprite(100,600,100,100);
  castle.addImage(castleImg);
  


  player = createSprite(300,600,70,150)
  player.addImage(playerImg);
  player.scale = 0.1

  gameover = createSprite(600,400);
  gameover.addImage(gameoverImg);
  gameover.visible = false;


  invisG = createSprite(600,700,1200,10);
  invisG.visible = false;

  obstacleGroup = new Group();
  fruitGroup = new Group(); 
  arrowGroup = new Group();
}


function draw(){
  background(0);
  if(gameState===PLAY){
    if(bg.x <= 400){
      bg.x = bg.width/2;
    }

    if(keyDown("up")){
      arrows();
    }

    if(keyDown("space") && player.y >= 500){
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;

    if(fruitGroup.isTouching(arrowGroup)){
      score = score + 2;
      fruitGroup.destroyEach();
      arrowGroup.destroyEach();
    }


    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
    
  }
  else if(gameState === END){
    bg.velocityX = 0;
    player.visible = false;
    obstacleGroup.destroyEach();
    fruitGroup.destroyEach();
    gameover.visible = true;
    
  }

  
  spawnObstaclesJump();
  spawnfruit();
  player.collide(invisG);
  drawSprites();
  textSize(45);
  stroke("red"); 
  text("Score: " + score, 100,100);
}

function spawnObstaclesJump(){
  if(frameCount % 150 === 0){
    var obstacle = createSprite(1200,700,40,10);
    obstacle.velocityX = -6;
      var rand = Math.round(random(1,6));
      switch(rand){
        case 1: obstacle.addImage(obstacle1);
          obstacle.scale = 0.5;
          break;
        case 2: obstacle.addImage(obstacle2);
          obstacle.scale = 0.5;
          break;
        case 3: obstacle.addImage(obstacle3);
        obstacle.scale = 2;
          break;
        default: break;
      }
      obstacle.scale = 0.5;
      obstacle.lifetime = 220;

      obstacleGroup.add(obstacle);


  }
}
function spawnfruit(){
  if(frameCount % 200 === 0){
    var fruit = createSprite(1200,400,40,10);
    fruit.velocityX=-6;
      var rand = Math.round(random(1,2));
      switch(rand){
        case 1: fruit.addImage(grapeImg);
          break;
        case 2: fruit.addImage(appleImg);
          break;
        default: break;
      }
      fruit.scale = 0.25;
      fruit.lifetime = 220;
      fruitGroup.add(fruit);
  }
}
function arrows(){
  arrow = createSprite(300,600,10,70);
  arrow.addImage(arrowImg);
  arrow.y = player.y;
  arrow.velocityX = 6;
  
  arrow.lifetime = 200;

  arrowGroup.add(arrow);
}
