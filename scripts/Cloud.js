//OBJECT CONSTRUCTORS

function Cloud(x, y,velX) {
    "use strict";
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.width = 120;
    this.height = 32;
    this.radius = this.height / 2;

    this.draw = function (context,size) {
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