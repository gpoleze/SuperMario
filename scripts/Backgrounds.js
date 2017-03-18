function Background(world, width, height) {
    var world = world;
    var dWidth = width;
    var dHeight = height;
    var sWidth = 512;
    var sHeight = 432;
    this.onload = false;

    var backgroundDisplacementMap = {
        yoshi: {
            x: 516,
            y: 438
        }
    };

    var image = new Image();
    image.src = "images/backgrounds/backgrounds.png";
    image.onload = fnOnload;

    this.draw = fnDraw;

    function fnOnload() {
        this.onload = true;
    };

    function fnDraw(ctx) {
        var sx = backgroundDisplacementMap[world].x;
        var sy = backgroundDisplacementMap[world].y;
        var dx = 0;
        var dy = 0;
        var dWidth = width;
        var dHeight = height;

        ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        
        
    }

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
