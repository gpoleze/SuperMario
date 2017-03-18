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
    var ctxBackground = canvas.getContext("2d");
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
    var map = [];
    var block = 8;

    for (var i = 0; i < canvas.width / block; i++) {
        map[i] = [];
        for (var j = 0; j < canvas.height / block; j++) {
            if (j == 104)
                map[i][j] = true;
            else if (j > 104)
                map[i][j] = true;
            else
                map[i][j] = false;
        }
    }

    var stage = new Stage(map, canvas.width, canvas.height,"yoshi");

    //BACKGROUND
    var background = new Background("yoshi", canvas.width, canvas.height);
    
    
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
            hero:mario,
            background:background,
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
