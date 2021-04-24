var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor: "#000000",
    netWidth : 6,
    netColor: "#FFFFFF",

    scorePosPlayer1 : 270,
    scorePosPlayer2 : 395,

    wallSound : null,
    playerSound : null,

    divGame : null,

    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        speed : 2,
        directionX : 1,
        directionY : 1,
        inGame : false,

        move : function() {
            if ( this.inGame ) {
                this.posX += this.directionX * this.speed;
                this.posY += this.directionY * this.speed;
            }
        },

        bounce : function(soundToPlay) {
            if ( this.posX > game.groundWidth || this.posX < 0 ){
              this.directionX = -this.directionX;
              soundToPlay.play();
            }
            if ( this.posY > game.groundHeight || this.posY < 0 ){
              this.directionY = -this.directionY;
              soundToPlay.play();
            }
        },

        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              this.speed = this.speed+0.2;
              console.log(this.speed)
              return true;
            } 
            return false;
        },

        lost : function(player) {
            var returnValue = false;
            if ( player.originalPosition == "left" && this.posX < player.posX - this.width ) {
              this.speed = 2;
              returnValue = true;
            } else if ( player.originalPosition == "right" && this.posX > player.posX + player.width ) {
              this.speed = 2;
              returnValue = true;
            }
            return returnValue;
        }
    },

    playerOne : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 50,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "left",
        score : 0,
        ai : false
    },
       
    playerTwo : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 600,
        posY : 200,
        goUp : false,
        goDown : false,
        originalPosition : "right",
        score : 0,
        ai : true
    },

    playerThree : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 90,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "left",
      ai : false
    },

    playerFour : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 640,
      posY : 200,
      goUp : false,
      goDown : false,
      originalPosition : "right",
      ai : true
    },

    init : function() {
        this.divGame = document.getElementById("divGame");

        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0); 
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        
        this.playersBallLayer = game.display.createLayer("joueursetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);  

        this.displayScore(0,0);
        this.displayBall(200,200);
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

        this.wallSound = new Audio("./sound/wall.ogg");
        this.playerSound = new Audio("./sound/paddle.ogg");

        game.ai.setPlayerAndBall(this.playerTwo, this.ball);
        //game.ai.setPlayerAndBall(this.playerFour, this.ball);

    },

    initMouse : function(onMouseMoveFunction) {
      window.onmousemove = onMouseMoveFunction;
    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    clearLayer : function(targetLayer) {
      targetLayer.clear();
    },

    movePlayers: function () {
      if (game.playerOne.goUp) {
        if (game.playerOne.posY < game.groundHeight - game.playerOne.height){
          game.playerOne.posY -= 10;
        }
      } else if (game.playerOne.goDown) {
        if (game.playerOne.posY > 0) {
          game.playerOne.posY += 10;
        }
      }
      if (game.playerThree.goUp) {
        if (game.playerThree.posY < game.groundHeight - game.playerThree.height){
          game.playerThree.posY -= 10;
        }
      } else if (game.playerThree.goDown) {
        if (game.playerThree.posY > 0) {
          game.playerThree.posY += 10;
        }
      }
    },

    movePlayerOne: function () {
      if (game.playerOne.goUp) {
        if (game.playerOne.posY > 0){
          game.playerOne.posY -= 10;
        }
      } else if (game.playerOne.goDown) {
        if (game.playerOne.posY < game.groundHeight - game.playerOne.height) {
          game.playerOne.posY += 10;
        }
      }
    },

    movePlayerThree: function () {
      if (game.playerThree.goUp) {
        if (game.playerThree.posY > 0){
          game.playerThree.posY -= 10;
        }
      } else if (game.playerThree.goDown) {
        if (game.playerThree.posY < game.groundHeight - game.playerThree.height) {
          game.playerThree.posY += 10;
        }
      }
    },

    displayScore : function(scorePlayer1, scorePlayer2) {
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer1, "60px Arial", "#FFFFFF", this.scorePosPlayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scorePlayer2, "60px Arial", "#FFFFFF", this.scorePosPlayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    moveBall : function() { 
        this.ball.move();
        this.ball.bounce(this.wallSound);
        this.displayBall();
    },

    displayPlayers : function() {
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
      game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
      //game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
    },

    collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
        if ( this.ball.collide(game.playerTwo) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
        if ( this.ball.collide(game.playerThree) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
        if ( this.ball.collide(game.playerFour) ) {
          game.ball.directionX = -game.ball.directionX;
          this.playerSound.play();
        }
    },  

    lostBall : function() {
        if ( this.ball.lost(this.playerOne) ) {
            this.playerTwo.score++;
            this.ball.inGame = false;
             
            if ( this.playerOne.ai ) { 
              setTimeout(game.ai.startBall(), 3000);
            }
          } else if ( this.ball.lost(this.playerTwo) ) {
            this.playerOne.score++;
            this.ball.inGame = false;
         
            if ( this.playerTwo.ai ) { 
              setTimeout(game.ai.startBall(), 3000);
            }
          }
          this.scoreLayer.clear();
          this.displayScore(this.playerOne.score, this.playerTwo.score);
    },

    majPlayerOne : function(P1) {
      this.playerOne.posY = P1.posY
    },
    /*majPlayerTwo : function(P2) {
      this.playerTwo.posY = P2.posY
    },*/
    majPlayerThree : function(P3) {
      this.playerThree.posY = P3.posY
    },
    /*majPlayerFour : function(P4) {
      this.playerFour.posY = P4.posY
    }*/

    majBall : function(Ball) {
      this.ball.posX = Ball.posX;
      this.ball.posY = Ball.posY;
      this.ball.directionX = Ball.directionX;
      this.ball.directionY = Ball.directionY;
      this.ball.inGame = Ball.inGame;
     },

     majScore : function(PlayerOneScore, PlayerTwoScore) {
      this.playerOne.score= PlayerOneScore;
      this.playerTwo.score= PlayerTwoScore;
     },
};