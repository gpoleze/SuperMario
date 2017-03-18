(function () {
    "use strict";
    //GAME SETUP

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");


    //Character Creation
    var mario = new CharacterPack();


    //CLOUDS CREATION
    var numberOfClouds = Math.ceil(Math.random() * 8);

    var cloud = new Array(numberOfClouds);
    for (var i = 0; i < cloud.length; i++)
        cloud[i] = new Cloud(Math.random() * 1024, Math.random() * 200, Math.random() * 4);



    //Loading Page
    loading();

    //Game Setup


    mario.x = 100;
    mario.y = 650;

    mario.populateFrames();
    //    mario.load("big", "walk", "right", 2);
    mario.load("big", "run", "right", 3);
    mario.load("big", "run", "left", 3);
    //    mario.load("big", "jump", "right", 2);

    var fps = 24;
    var frameAt = 1;
    var stop = false;

    //Gravity simulator
    var g = 4;



    //CONTROLS IF ALL ELEMENTS WHERE LOADED BEFORE STARTING THE ANIMATION
    function loading() {
        if (mario.loaded) {
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

        //MOVIE CHARACTER
        if (mario.y > ground)
            mario.velY += g;

        mario.x += mario.velX;
        mario.y += mario.velY;

        if (mario.x > (1024 + 32))
            mario.x = -32;
        if (mario.x < (-32))
            mario.x = (1024 + 32);

        if (mario.y == ground) {
            mario.action = "run";
        }


        if (mario.velX > 0)
            mario.direction = mario.directionList[0];
        if (mario.velX < 0)
            mario.direction = mario.directionList[1];

        if (frameAt++ > 24)
            frameAt = 1;

        if (mario.velX == 0)
            mario.nextFrame = 0;





        if (!stop)
            setTimeout(main, 1000 / fps);


    }

    function drawAnimation() {
        //CLEAR THE CANVAS
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Background
        canvas.style.backgroundImage = "url(frames/backgrounds/yoshis_island_croped.png)";

        //DRAW 
        mario.draw(ctx);

        for (var i = 0; i < cloud.length; i++)
            cloud[i].draw(ctx);


    }

    function controls(e) {
        e.preventDefault();

        console.log(e.key);

        if (e.key == "d" || e.key == "D")
            mario.velX = 8;
        if (e.key == "a" || e.key == "A")
            mario.velX = -8;
    }

    function jump(e) {
        if ((e.key == "w" || e.key == "W") && mario.velY == 0) {
            mario.velY = -16;
            mario.action = "jump";
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
    window.addEventListener("keypress", controls);

    //JUMP
    window.addEventListener("keyup", function (e) {
        e.preventDefault();
        mario.velX = 0;
    });
    //    window.addEventListener("keydown", jump);



    //OBJECT CONSTRUCTORS

    function Cloud(x, y, velX) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.width = 120;
        this.height = 32;
        this.radius = this.height / 2;

        this.draw = function (context) {
            var x = this.x;
            var y = this.y;
            var w = this.width;
            var h = this.height;
            var r = this.radius;

            context.beginPath();

            context.arc(
                x + (w / 2 + r), y,
                r,
                1.5 * Math.PI, 0.5 * Math.PI
            );

            context.lineTo(x - (w / 2 - r), y + h / 2);

            context.arc(
                x - (w / 2 - r), y,
                r,
                0.5 * Math.PI, 1.5 * Math.PI
            );

            context.closePath()

            context.fillStyle = "white";
            context.fill();
        }
    }


    function CharacterPack() {
        //Fields related to the movement
        this.x = null;
        this.y = null;
        this.velX = 0;
        this.velY = 0;

        //FIELDS RELATED WITH WHICH FRAME WILL BE DRAWN
        this.powerUp = "big";
        this.powerUpList = ["big"]; //, "small", "fire", "cape"];

        this.action = "run";
        this.actionList = ["run"]; //["walk", "run", "jump"];

        this.direction = "right";
        this.directionList = ["right", "left"];

        //ARRAY TO STORE THE IMAGES
        this.images; //[powerUpList][actionList][directionList] = [frames = new Image()]

        //SIZE OF THE FRAME AND ITS SCALE
        this.width = 32;
        this.height = 32;
        this.scale = 2; //arbitrary value, the correct would be equal 1


        this.loaded = false;
        this.framesloaded = 0;
        this.framesToLoad = 0;

        this.folder = "frames";

        this.nextFrame = 0;

        //Methods
        this.populateFrames = function () {
            //Dimension 1: Power Ups
            this.images = new Array(this.powerUpList.length);

            //Dimensio 2: Aciotns
            for (var i = 0; i < this.powerUpList.length; i++) {
                this.images[i] = new Array(this.actionList.length);
                //Dimension 3: Directions
                for (var j = 0; j < this.actionList.length; j++)
                    this.images[i][j] = new Array(this.directionList.length);
            }
        }

        this.findImage = function (power, action, direction) {
            var i = (this.powerUpList).indexOf(power);
            var j = (this.actionList).indexOf(action);
            var k = (this.directionList).indexOf(direction);

            return this.images[i][j][k];
        }

        this.checkLoaded = function () {
            this.loaded = this.framesToLoad === this.framesloaded;
        }

        this.load = function (power, action, direction, numberOfFrames) {
            this.loaded = false;
            this.framesToLoad += numberOfFrames;

            //CREATE THE IMAGES OBJECTS
            var img = {
                qtyFrames: numberOfFrames,
                nextFrame: 0,
                frames: new Array(numberOfFrames)
            };


            var that = this;
            for (var i = 0; i < numberOfFrames; i++) {
                img.frames[i] = new Image();
                img.frames[i].src = this.folder + "/" + power + "_" + action + "_" + direction + "_" + i + ".png";

                img.frames[i].onload = function () {
                    that.framesloaded++;
                    that.checkLoaded();
                }
            }

            var i = (this.powerUpList).indexOf(power);
            var j = (this.actionList).indexOf(action);
            var k = (this.directionList).indexOf(direction);

            this.images[i][j][k] = img;
        }

        this.draw = function (context) {

            var img = this.findImage(this.powerUp, this.action, this.direction);

            context.drawImage(
                img.frames[img.nextFrame],
                this.x, this.y,
                this.scale * this.width,
                this.scale * this.height);

            if (this.velX == 0) {
                this.nextFrame = 0;
                return;
            }

            if (frameAt % 2 == 0)
                if (++img.nextFrame >= img.qtyFrames)
                    img.nextFrame -= img.qtyFrames;

        }


    }


    /*
                                ctx.drawImage(image, dx, dy, dWidth, dHeight);
    
                                dx ==> The X coordinate in the destination canvas at which to place the top-left corner of the source image.
    
                                dy ==> The Y coordinate in the destination canvas at which to place the top-left corner of the source image.
    
                                dWidth ==> The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.

                                dHeight ==> The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.
    
                                */


})();