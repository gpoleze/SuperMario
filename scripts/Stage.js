function Stage(map, width, height,world) {

    var elementsOnScreen = map;

    var ImagesToLoad = 1;
    var imagesLoaded = 0;
    var loaded = false;
    var width = width;
    var height = height;

    var world = world;

    this.load = function () {
        var that = this;

        //FOREGROUND
        that.ground = new Image();
        that.ground.src = "images/backgrounds/ground_tiles.png";
        that.ground.height = 16;
        that.ground.width = 16;
        that.ground.onload = function () {
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
        var dWidth = 8;
        var dHeight = 8;

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

                } else if (j > 93) {
                    eos[i][j] = {
                        x: 155,
                        y: 117
                    }
                } else {
                    eos[i][j] = false;
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
