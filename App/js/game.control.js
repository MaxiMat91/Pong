
game.keycode = {
    KEYDOWN : 40,
    KEYUP : 38,
    SPACEBAR : 32
}

game.control = {

    onKeyDown : function(event) {

        if ( event.keyCode == game.keycode.KEYDOWN) {
            game.playerOne.goDown = true;
            game.playerThree.goDown = true;
        } 
        else if ( event.keyCode == game.keycode.KEYUP) {
            game.playerOne.goUp = true;
            game.playerThree.goUp = true;
        }

        if ( event.keyCode == game.keycode.SPACEBAR && !game.ball.inGame ) { 
            game.ball.inGame = true;
            game.ball.posX = game.playerThree.posX + game.playerThree.width+5;
            game.ball.posY = game.playerThree.posY;
            game.ball.directionX = 1;
            game.ball.directionY = 1;
        }
    },
     
    onKeyUp : function(event) {

        if ( event.keyCode == game.keycode.KEYDOWN ) {
            game.playerOne.goDown = false;
            game.playerThree.goDown = false;
        } 
        else if ( event.keyCode == game.keycode.KEYUP ) {
            game.playerOne.goUp = false;
            game.playerThree.goUp = false;
        }
    },
}