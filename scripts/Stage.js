function Stage(map, size, scale, width, height, world) {
    //---- FIELDS -----//
    var elementsOnScreen = map;
    var width = width;
    var height = height;
    var world = world;
    var loaded = false;
    var image = new Image();
    image.src = "images/backgrounds/ground_tiles.png";
    image.onload = fnLoaded;
    var blockSize = size;
    var scale = scale;


    //---- METHODS ----//
    this.draw = fnDraw;
    this.isLoaded = fnIsLoaded;
    this.getElementsOnScreen = fnGetElementsOnScreen;
    this.getBlockSize = fnGetBlockSize;

    //---- FUNCTIONS ----//
    function fnLoaded() {
        loaded = true;
    }

    function fnIsLoaded() {
        return loaded;
    }

    function fnGetElementsOnScreen() {
        return elementsOnScreen;
    }

    function fnGetBlockSize() {
        return blockSize;
    }

    //SERIOUS PROBLEMS HERE!!! IF I ASK TO DRAW EACH FRAME IT SLOW DOWN THE PROGRAM TOO MUCH
    function fnDraw(ctx) {
        for (var y = 0; y < height / blockSize; y++)
            for (var x = 0; x < width / blockSize; x++)
                if (elementsOnScreen[x][y]) {
                    //                    console.log(elementsOnScreen[x][y]);
                    var sx = elementsOnScreen[x][y].sx;
                    var sy = elementsOnScreen[x][y].sy;
                    var sWidth = elementsOnScreen[x][y].sWidth;
                    var sHeight = elementsOnScreen[x][y].sHeight;
                    var dx = x * blockSize;
                    var dy = y * blockSize;
                    var dWidth = blockSize;
                    var dHeight = blockSize;
                    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                }
    }
}


/*
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
