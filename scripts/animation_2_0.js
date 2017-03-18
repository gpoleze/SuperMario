;
(function () {
    "use strict";

    //---- GAME SETUP ----//
    var game = gameSetup();

    var canvas = game.canvas;
    var ctx = game.ctx;
    var ctxBackground = game.ctxBackground;
    var cloud = game.cloud;

    var mario = game.hero;
    
    //---- ELEMENTS INSTATIATION ----//
//    var mario = new Hero("mario", game.marioSpriteMap, game.scale)

    
    //---- LOADING ----//
    loading();

    function loading() {
        if (mario.isLoaded()) {
            main();
        } else {
            loadingMessage();
            setTimeout(loading, 100);
        }
    }

    function loadingMessage() {
        ctx.save();
        ctx.font = "20px Georgia";
        ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }


    //---- GAME ----//
    function main() {
        startGame();
    }

    //----  ----//
    function startGame() {
        // UPDATE THE GAME
        updateGame();

        // RENDER THE GAME ON THE SCREEN
        drawGame();
    }

    //---- GAME'S LOGIC ----//
    function updateGame() {
        //MOVE THE CLOUDS
        for (var i = 0; i < cloud.length; i++) {
            cloud[i].x += cloud[i].velX;
            if (cloud[i].x > (1024 + cloud[i].width))
                cloud[i].x = -cloud[i].width;
        }


        //UPDATE PLACE ON THE SCREEN
        mario.size();
        mario.move(game.g);

        //RESTART ANIMATION
        if (!game.stop)
            setTimeout(startGame, 1000 / game.fps);

    }

    //---- GAME RENDERING ----//
    function drawGame() {
        //CLEAR THE CANVAS
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        //Background and foreground
        
        game.background.draw(ctxBackground);
        //        stage.drawBackground(ctxBackground);
        //        stage.drawGround(ctxBackground);

        for (var i = 0; i < cloud.length; i++)
            cloud[i].draw(ctx);


        //DRAW 
        mario.draw(ctx);

    }


    //EVENT LISTENER
    document.getElementById("myCanvas").addEventListener("click", function () {
        if (!game.stop) {
            game.stop = true;
        } else {
            game.stop = false;
            main();
        }
        console.log(game.stop);
    });

    //CONTROLS
    window.addEventListener("keypress", function (e) {
        e.preventDefault();
        mario.control(e);
    });

    window.addEventListener("keyup", function (e) {
        e.preventDefault();
        mario.control(e);
    });

})();
