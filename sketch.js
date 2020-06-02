var canvas;

var backgroundImg;

var backgroundImg,playerImg,car1Img,car2Img,car3Img,car4Img;

var score = 0;

var obstaclesGroup,obstacles;

var gameState = 1;

function preload(){
    backgroundImg = loadImage("images/track.png");
    playerImg = loadImage("images/Player Car.png");
    car1 = loadImage("images/Car1.png");
    car2 = loadImage("images/Car2.png");
    car3 = loadImage("images/Car3.png");
    car4 = loadImage("images/Car4.png");
    restartImg = loadImage("images/Restart.png");
}

function setup(){
    canvas = createCanvas(displayWidth,displayHeight);

    player = createSprite(displayWidth/2,displayHeight/2 + 200);
    player.addImage("image1",playerImg);
    player.scale = 0.4;
    //player.debug = true;
    player.setCollider("rectangle",0,0,200,580);

    invisibleWall = createSprite(displayWidth/2 - 450,displayHeight/2,30,displayHeight);
    invisibleWall.visible = false;

    invisibleWall2 = createSprite(displayWidth/2 + 450,displayHeight/2,30,displayHeight);
    invisibleWall2.visible = false;

    restart = createSprite(displayWidth/2 - 5,displayHeight/2 - 20);
    restart.addImage("img",restartImg);
    restart.scale = 0.15;
    restart.visible = false;

    obstaclesGroup = new Group();

    score = 0;
}

function draw(){
    background(backgroundImg);

    fill("#ffdb58");
    strokeWeight(7);
    stroke(255,0,0);
    textSize(50);
    textStyle(BOLD);
    textFont("Comic Sans MS");
    text("Score : " + score,displayWidth/2 + 150,50);

    if(gameState === 1){
        score = score + Math.round(getFrameRate() / 60);

        if(keyDown(RIGHT_ARROW)){
            player.velocityX = 8;
        }else if(keyDown(LEFT_ARROW)){
            player.velocityX = -8;
        }

        player.collide(invisibleWall);
        player.collide(invisibleWall2);

        spawnObstacles();
        
        if(obstaclesGroup.isTouching(player)){
            gameState = 2;
        }
    }else if(gameState === 2){
        restart.visible = true;

        fill("#ffdb58");
        strokeWeight(7);
        stroke(255,0,0);
        textSize(50);
        textStyle(BOLD);
        textFont("Comic Sans MS");
        text("Game Over",displayWidth/2 - 130,displayHeight/2 - 100);

        player.velocityX = 0;

        obstacle.velocityY = 0;

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    drawSprites();

}

function spawnObstacles(){
    if(frameCount%80 === 0){
        obstacle = createSprite(random(displayWidth/2 - 430,displayWidth/2 + 430),-5);
        obstacle.velocityY = (6 + 1.5 * score / 100);

        obstacle.depth = player.depth;
        player.depth = player.depth + 1;
        restart.depth = player.depth;

        //obstacle.debug = true;

        var rand = Math.round(random(1, 4));
        switch (rand) {
        case 1:
            obstacle.addImage(car1);
            obstacle.scale = 0.5;
            obstacle.setCollider("rectangle",0,-20,150,370);
            break;
        case 2:
            obstacle.addImage(car2);
            obstacle.setCollider("rectangle",0,0,70,170);
            break;
        case 3:
            obstacle.addImage(car3);
            obstacle.scale = 0.5;
            obstacle.setCollider("rectangle",0,0,150,355);
            break;
        case 4:
            obstacle.addImage(car4);
            obstacle.setCollider("rectangle",0,-10,65,200);
            break;
        default:
            break;
        }

        obstaclesGroup.add(obstacle);
    }
}

function reset() {
    gameState = 1;
    restart.visible = false;
  
    obstaclesGroup.destroyEach();
  
    score = 0;
}