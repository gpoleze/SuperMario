(function () {
    "use strict";
    //GAME SETUP

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var ctxBackground = canvas.getContext("2d");
    //Problem solving
    ctxBackground.save();
    ctxBackground.fillStyle = "gray";
    ctxBackground.fillRect(0, 0, canvas.width, canvas.height);
    ctxBackground.restore();
    //end of PS

    //Character Creation
    var mario = new CharacterPack();
    var stage = new Stage();

    //CLOUDS CREATION
    var numberOfClouds = Math.ceil(Math.random() * 8);

    var cloud = new Array(numberOfClouds);
    for (var i = 0; i < cloud.length; i++)
        cloud[i] = new Cloud(Math.random() * 1024, Math.random() * 200, Math.random() * 4);



    //Loading Page
    loading();

    //Game Setup

    mario.x = 0;
    mario.y = 712;

    mario.populateFrames();
    mario.load("big", "walk", "right", 2);
    mario.load("big", "run", "right", 3);
    mario.load("big", "run", "left", 3);
    mario.load("big", "jump", "right", 2);
    mario.load("big", "jump", "left", 2);

    var fps = 24;
    var frameAt = 1;
    var stop = false;

    //Gravity simulator
    var g = 1;


    //CONTROLS IF ALL ELEMENTS WHERE LOADED BEFORE STARTING THE ANIMATION
    function loading() {
        if (mario.loaded && stage.loaded) {
            stage.drawBackground(ctxBackground);
            main();
        } else {
            loadingMessage();
            setTimeout(loading, 100);
        }
    }

    function loadingMessage() {
        ctx.save()

        ctx.font = "20px Georgia";
        ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2);

        ctx.restore()
    }

    function main() {


        startAnimation();

    }

    function startAnimation() {
        // UPDATE THE GAME
        updateAnimation();

        // RENDER THE GAME ON THE SCREE
        //        window.requestAnimationFrame(drawAnimation);
        drawAnimation()
    }

    function updateAnimation() {
        //THE LOGIC GOES HERE


        //MOVE THE CLOUDS
        for (var i = 0; i < cloud.length; i++) {
            cloud[i].x += cloud[i].velX;
            if (cloud[i].x > (1024 + cloud[i].width))
                cloud[i].x = -cloud[i].width;
        }


        //ROTATE THE SCREEN
        if (mario.x > (1024 + 32))
            mario.x = -32;
        if (mario.x < (-32))
            mario.x = (1024 + 32);


        //SELECT THE FRAME SIDE TO DISPLAY

        // Face Right
        if (mario.velX > 0)
            mario.direction = mario.directionList[0];
        //Face Left
        if (mario.velX < 0)
            mario.direction = mario.directionList[1];

        //Jump
        if (mario.velY > 0 || mario.velY < 0)
            mario.action = mario.actionList[2];

        //Coming back to the ground
        if (mario.velY == 0)
            mario.action = mario.actionList[1]; //RUN


        //ADJUST THE VELOCITY ACCORDING TO THE G
        mario.collide();
        //                if (mario.collide())
        // mario.velY += g;


        //UPDATE PLACE ON THE SCREEN

        mario.x += mario.velX;
        mario.y += mario.velY;


        //RESTART ANIMATION
        if (!stop)
            setTimeout(startAnimation, 1000 / fps);


    }

    function drawAnimation() {
        //CLEAR THE CANVAS
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Background
        //                canvas.style.backgroundImage = "url(frames/backgrounds/yoshis_island_croped.png)";

        //Background and foreground
        stage.drawBackground(ctxBackground);
        stage.drawGround(ctxBackground);





        //DRAW 
        mario.draw(ctx);

        for (var i = 0; i < cloud.length; i++)
            cloud[i].draw(ctx);


    }

    function controls(e) {
        //        e.preventDefault();
        //
        //
        //        if (e.key == "d" || e.key == "D")
        //            mario.velX = 8;
        //        if (e.key == "a" || e.key == "A")
        //            mario.velX = -8;

    }

    function jump(e) {
        if (mario.velY != 0) return;
        if (e.key == "w" || e.key == "W") {
            mario.velY = -32;
            console.log('jump');
        }
    }

    //EVENT LISTENER
    document.getElementById("myCanvas").addEventListener("click", function () {
        if (!stop) {
            stop = true;
        } else {
            stop = false;
            main();
        }

    });
    //CONTROLS
    //MOVE RIGHT AND LEFT
    window.addEventListener("keypress", function (e) {
        mario.move(e);
    });

    //JUMP
    window.addEventListener("keyup", function (e) {
        e.preventDefault();
        mario.velX = 0;
    });
    window.addEventListener("keydown", jump);




})();