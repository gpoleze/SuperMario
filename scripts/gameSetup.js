;
(function () {
    "use strict";

    //Basic Rederization setups
    var fps = 24;
    var stop = false;

    //Gravity simulator
    var g = 2;

    //initialize canvas and contexts
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var canvasBackground = document.getElementById("myCanvas");
    var ctxBackground = canvasBackground.getContext("2d");
    var scale = 2;

    var width = 512;
    var height = 432;

    canvas.width = width * scale;
    canvas.height = height * scale;

    //Heroes
    var marioSpriteMap = {
        small: {
            walk: {
                frames: 2,
                width: 14,
                height: 18,
                left: [
                    {
                        x: 196 - 13 - 14,
                        y: 0,
                    },
                    {
                        x: 196 - 133 - 14,
                        y: 0
                    }
                ],
                right: [
                    {
                        x: 196 + 13,
                        y: 0,
                    },
                    {
                        x: 196 + 133,
                        y: 0
                    }
                ]
            },
            run: {
                frames: 2,
                width: 14,
                height: 18,
                left: [
                    {
                        x: 196 - 13 - 14,
                        y: 0,
                    },
                    {
                        x: 196 - 133 - 14,
                        y: 0
                    }
                ],
                right: [
                    {
                        x: 196 + 13,
                        y: 0,
                    },
                    {
                        x: 196 + 133,
                        y: 0
                    }
                ]
            },
            jump: {
                frames: 2,
                width: 16,
                height: 22,
                left: [
                    {
                        x: 196 - 12 - 16,
                        y: 39,
                    },
                    {
                        x: 196 - 52 - 16,
                        y: 39
                    }
                ],
                right: [
                    {
                        x: 196 + 12,
                        y: 39,
                    },
                    {
                        x: 196 + 52,
                        y: 39
                    }
                ]
            }
        }
    }
    var mario = new Hero("mario", marioSpriteMap, scale)


    //First Stage Map Elements
    var block = 16 * scale;
    var map = getMap(block,canvas);


    var stage = new Stage(map, block, scale, canvas.width, canvas.height, "yoshi");

    //    stage.draw(ctxBackground);

    //BACKGROUND
    var background = new Background("yoshi", canvas.width, canvas.height);
    //    background.draw(ctxBackground);

    //CLOUDS CREATION
    var numberOfClouds = Math.ceil(Math.random() * 8);
    var cloud = new Array(numberOfClouds);

    for (var i = 0; i < cloud.length; i++)
        cloud[i] = new Cloud(Math.random() * canvas.width,
            Math.random() * (canvas.width / 5),
            Math.random() * 4
        );


    window.gameSetup = fnGameSetup;

    function fnGameSetup() {
        return {
            hero: mario,
            background: background,
            stage: stage,
            fps: fps,
            stop: stop,
            g: g,
            canvas: canvas,
            ctx: ctx,
            ctxBackground: ctxBackground,
            scale: scale,
            map: map,
            block: block,
            marioSpriteMap: marioSpriteMap,
            cloud: cloud
        };
    }

})();
