//OBJECT CONSTRUCTORS

function Cloud(x, y, velX) {
    "use strict";
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
    "use strict";
    //Fields related to the movement
    this.x = null;
    this.y = null;
    this.velX = 0;
    this.velY = 0;

    //FIELDS RELATED WITH WHICH FRAME WILL BE DRAWN
    this.powerUp = "big";
    this.powerUpList = ["big"]; //, "small", "fire", "cape"];

    this.action = "run";
    this.actionList = ["walk", "run", "jump"];

    this.direction = "right";
    this.directionList = ["right", "left"];

    //ARRAY TO STORE THE IMAGES
    this.images; //[powerUpList][actionList][directionList] = [frames = new Image()]

    //SIZE OF THE FRAME AND ITS SCALE
    this.width = 32;
    this.height = 32;
    this.scale = 1; //arbitrary value, the correct would be equal 1

    this.loaded = false;
    this.framesloaded = 0;
    this.framesToLoad = 0;

    this.folder = "frames";

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
            frameIncrementer: 1,
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

        //Run drawing frames decision
        if (this.velX == 0 && this.velY == 0) {
            img.nextFrame = 0;
        } else {
            if (img.nextFrame + 1 == img.qtyFrames)
                img.frameIncrementer = -1;
            if (img.nextFrame == 0)
                img.frameIncrementer = 1;
            img.nextFrame += img.frameIncrementer;
        }

        if (this.velY < 0)
            img.nextFrame = 0;
        if (this.vely > 0)
            img.nextFrame = 1;

        //            console.log(img.nextFrame);

        context.drawImage(
            img.frames[img.nextFrame],
            this.x, this.y,
            this.scale * this.width,
            this.scale * this.height);

    }

    this.collide = function (obj) {
        var that = this;
        var upLeft = {
            x: that.x,
            y: that.y,
            qx: Math.floor(that.x / 8),
            qy: Math.floor(that.y / 8),
        };
        var upRight = {
            x: that.x + that.width,
            y: that.y,
            qx: Math.floor((that.x + that.width) / 8),
            qy: Math.floor(that.y / 8),
        };
        var bottomLeft = {
            x: that.x,
            y: that.y + that.height,
            qx: Math.floor(that.x / 8),
            qy: Math.floor((that.y + that.height) / 8),
        };
        var bottomRight = {
            x: that.x + that.width,
            y: that.y + that.height,
            qx: Math.floor((that.x + that.width) / 8),
            qy: Math.floor((that.y + that.height) / 8),
        };



        //        console.log(upLeft);//        console.log(bottomRight);

        //Top 
        //Bottom

        //Left
        //Right

    }

    this.move = function (e) {
        console.log("method");
        e.preventDefault();

        if (e.key == "d" || e.key == "D")
            this.velX = 8;
        if (e.key == "a" || e.key == "A")
            this.velX = -8;


    }


}

function Stage() {
    this.ground;
    this.elementsOnScreen = [];
    this.stage;
    this.backgroundLayer;

    this.ImagesToLoad = 2;
    this.imagesLoaded = 0;
    this.loaded = false;
    this.width = 1024;
    this.height = 768;

    this.load = function () {
        var that = this;

        //FOREGROUND
        that.ground = new Image();
        that.ground.src = "frames/backgrounds/ground_tiles.png";
        that.ground.height = 16;
        that.ground.width = 16;
        that.ground.onload = function () {
            that.imagesLoaded++;
            that.checkLoaded();

        }

        //BACKGROUND
        that.backgroundLayer = new Image();
        that.backgroundLayer.src = "frames/backgrounds/backgrounds.png";
        that.backgroundLayer.height = 432;
        that.backgroundLayer.width = 512;

        that.backgroundLayer.xDisplacement = 1;
        that.backgroundLayer.yDisplacement = 1;

        that.backgroundLayer.onload = function () {
            that.imagesLoaded++;
            that.checkLoaded();
        }

    };

    this.checkLoaded = function () {
        this.loaded = this.ImagesToLoad === this.imagesLoaded;
    };

    this.drawBackground = function (ctx) {

        var image = this.backgroundLayer;
        var sx = 2 + image.width * image.xDisplacement;
        var sy = 2 + image.height * image.yDisplacement;
        var sWidth = image.width;
        var sHeight = image.height;
        var dx = 0;
        var dy = 0;
        var dWidth = this.width;
        var dHeight = this.height;

        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    };

    this.drawGround = function (ctx) {

        //TEMPORARY FUNCTION, IT SHOULD BE IMPROVED LATER
        var eos = this.elementsOnScreen;

        var image = this.ground;
        //        var sx = (1 + 16) * 9; //+ image.width * image.xDisplacement;
        //        var sy = (1 + 16) * 6; //+ image.height * image.yDisplacement;
        var sx;
        var sy;
        var sWidth = 15; //image.width;
        var sHeight = 15; //image.height;
        var dx;
        var dy;
        var dWidth = 16 * 2;
        var dHeight = 16 * 2;

        var count = 0;
        try {
            for (i = 0; i < this.width / 8; i++) {
                count++;

                ctx.drawImage(image,
                    eos[i][93 + 0].x, eos[i][93 + 0].y,
                    sWidth, sHeight,
                    i * dWidth, this.height - dWidth * 3,
                    dWidth, dHeight);

                ctx.drawImage(image,
                    155, 117,
                    sWidth, sHeight,
                    i * dWidth, this.height - dWidth * 2,
                    dWidth, dHeight);

                ctx.drawImage(image,
                    155, 117,
                    sWidth, sHeight,
                    i * dWidth, this.height - dWidth * 1,
                    dWidth, dHeight);
            }

        } catch (err) {
            console.log("dx: ", dx, "dy: ", dy);
            console.log("error on count: " + count + "\n" + err);
        }
    }

    this.populateElemetnsOnScreen = function () {

        //TEMPORARY FUNCTION, IT SHOULD BE IMPROVED LATER
        var eos = this.elementsOnScreen;
        var count = 0;
        for (i = 0; i < this.width / 8; i++) {
            eos[i] = [];
            for (j = 0; j < this.height / 8; j++) {
                //                console.log(++count);
                if (j === 93) {
                    eos[i][j] = {
                        x: 155,
                        y: 100
                    }

                } else if (i > 93) {
                    eos[i][j] = {
                        x: 155,
                        y: 117
                    }
                } else {
                    eos[i][j] = {
                        x: 0,
                        y: 0
                    }
                }

            }
        }
    }



    this.load();
    this.populateElemetnsOnScreen();


}

/*
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

dx ==> The X coordinate in the destination canvas at which to place the top-left corner of the source image.

dy ==> The Y coordinate in the destination canvas at which to place the top-left corner of the source image.

dWidth ==> The width to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.

dHeight ==> The height to draw the image in the destination canvas. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn.

sx ==> The X coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.

sy ==> The Y coordinate of the top left corner of the sub-rectangle of the source image to draw into the destination context.

sWidth ==> The width of the sub-rectangle of the source image to draw into the destination context. If not specified, the entire rectangle from the coordinates specified by sx and sy to the bottom-right corner of the image is used.

sHeight ==> The height of the sub-rectangle of the source image to draw into the destination context.

*/