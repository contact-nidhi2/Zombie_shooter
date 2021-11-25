class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
    
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
            player1 = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
            player1.addImage(shooterImg)
              player1.scale = 0.3
              player1.debug = true
              player1.setCollider("rectangle",0,0,300,300)
    
              player2 = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
              player2.addImage(shooterImg)
                player2.scale = 0.3
                player2.debug = true
                player2.setCollider("rectangle",0,0,300,300)

       players=[player1,player2];
       //console.log(players[1].x)
       heart1 = createSprite(displayWidth-400,displayHeight-700,20,20)
        }
    
    play(){
             form.hide();

              Player.getPlayerInfo();
              image(bgImg,displayWidth-1500,displayHeight-1000,1500,1000);
               
              if(life===3){
              heart1.addImage(heart3Img)
              heart1.scale = 0.4;
              }
                 var x = 100;
                 var y = 200; 
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500;
                     y = 500 - allPlayers[plr].distance;
                     players[index -1].x = x;
                     players[index -1].y = y;
                     if(index === player.index){
                         
                       //add code to display the player's name on the respective basket.
                       
                       textSize(30);
                         text(allPlayers[plr].name, x-25, y+25);
                         if(keyWentDown("space")){
                      
                          bullet = createSprite( players[index -1].x+20, players[index -1].y,20,10);
                          bullet.velocityX = 20;
                          
                          bulletGroup.add(bullet)
                          //players[index -1].depth = bullet.depth;
                          //players[index -1].depth = players[index -1].depth+2;
                          players[index -1].addImage(shooter_shooting);
              
                        }
                        
                        //player goes back to original standing image once we stop pressing the space bar
                        else if(keyWentUp("space")){
                          players[index -1].addImage(shooterImg);
                        }

                     }
                    
                      text("Player 1 :"+allPlayers.player1.score, 50, 50)
                      text("Player 2 :"+allPlayers.player2.score,50, 100)
                 
                 }
                 
                 if(keyDown("UP_ARROW")||touches.length>0){
                    player.distance+= 10
                    player.update();
                  }
                  if(keyDown("DOWN_ARROW")||touches.length>0){
                    player.distance-= 10
                    player.update();
                  }
                  
               
                  //release bullets and change the image of shooter to shooting position when space is pressed
                  
                  
                  //go to gameState "bullet" when player runs out of bullets
                //   if(bullets==0){
                //     gameState = "bullet"
                      
                //   }
                if(frameCount % 50===0){
      
                    //giving random x and y positions for zombie to appear
                    zombie = createSprite(random(500,1100),random(100,500),40,40)
                
                    zombie.addImage(zombieImg)
                    zombie.scale = 0.15
                    zombie.velocityX = -3
                    zombie.debug = true;
                    zombie.setCollider("rectangle",0,0,400,800)
                   
                    zombie.lifetime = 400;
                    zombieGroup.add(zombie)
                  }
                  
                  //destroy the zombie when bullet touches it
                
                  for(var i=0;i<zombieGroup.length;i++){     
                   if(zombieGroup.get(i).isTouching(bulletGroup)){
                        zombieGroup.get(i).destroy();
                        bulletGroup.destroyEach();
                        player.score = player.score + 1;
                       
                        } 
                  
                  }
                
                
                //destroy zombie when player touches it
               
                 for(var i=0;i<zombieGroup.length;i++){     
                  if(zombieGroup.get(i).isTouching(players)){
                       zombieGroup.get(i).destroy();
                       life = life-1;
                       
                      if(life===2){
                       heart1.addImage(heart2Img);
                       heart1.scale = 0.4
                       
                      }else if(life===1){
                        heart1.addImage(heart1Img);
                        heart1.scale = 0.4
                
                      }else if(life===0){
                          gameState=2;
                      }
                   } 
        
                 
                }
       
    }

    end(){
        textSize(80)
        fill("red");    
        this.displayRanks();
        text("Your Score::  "+ player.score,300,500)
        }
    

    displayRanks(){
      camera.position.x=0;
      camera.position.y=0; 
      Player.getPlayerInfo();
      for(var plr in allPlayers){
        textSize(80);
        stroke("green")
      //compare score of two player
       // if(allPlayers[plr].score>allPlayers[plr+1].score){
          text(allPlayers[plr].name +"You Won ",200,200);
      //  }
        //else{
          text(allPlayers[plr].name +"You Lost ",200,220);
       // }
      }
    
    }
    
    
  }

