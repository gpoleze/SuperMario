    function Hero(name, spriteMap, scale) {
        //---- FIELDS -----//

        // VELOCITY
        var vx = 0;
        var vy = 0;

        //POSISITON
        var x = 200;
        var y = 600;

        //POWER UPS
        //    var powerUp = ["small", "big"];
        //    var action = ["walk", "run", "jump"];
        //    var direction = ["left", "right"];
        var powerUp = "small";
        var action = "walk";
        var direction = "right";


        //SPRITE SHEET IMAGE
        var image = new Image();
        var sprites = spriteMap; // sprite displacemt for all the images
        var loaded = false;
        image.src = "images/heroes/" + name + ".png";
        image.onload = fnLoaded;
        var frameAt = 0;
        var addToFrameAt = 1;

        //CHARACTER SIZE
        var height;
        var width;

        //---- METHODS ----//
        this.size = fnSize;

        this.isLoaded = fnIsLoaded;

        //To move the hero
        this.move = fnMove;

        //to detect collisions
        this.collide = fnCollide;

        //to draw itself on canvas
        this.draw = fnDraw;

        //static - to manage which image must be drawn
        this.whichImage = fnWhichImage;

        //Move the Hero through the map
        this.control = fnControl;

        //Decide which action the Hero is performing
        this.whichAction = fnWhichAction;

        this.whichDirection = fnWhichDirection;

        this.whichPowerUp = fnWhichPowerUp;

        //---- FUNCTIONS ----//
        function fnSize() {
            width = sprites[powerUp][action].width;
            height = sprites[powerUp][action].height;
        }

        function fnWhichAction() {
            //Decide about jumping
            if (vy != 0) {
                action = "jump"
            }
            if (vy == 0)
                action = "walk"
        }

        function fnWhichDirection() {
            if (vx == 0) return;
            if (vx > 0)
                direction = "right";
            if (vx < 0)
                direction = "left";
        }

        //Implement better deciocio later
        function fnWhichPowerUp() {
            powerUp = "small";
        }

        function fnLoaded() {
            loaded = true;
        };

        function fnIsLoaded() {
            return loaded;
        };

        function fnDraw(context) {

            this.whichAction();
            this.whichDirection();
            this.whichPowerUp();

            var obj = sprites[powerUp][action];

            // Which frame decision
            if (vx != 0) {
                if (frameAt + 1 > obj.frames - 1)
                    addToFrameAt = -1;
                if (frameAt - 1 < 0)
                    addToFrameAt = 1;
                frameAt += addToFrameAt;
            } else
                frameAt = 0;

            if (vy < 0)
                frameAt = 0;
            if (vy > 0)
                frameAt = 1;


            console.log(frameAt);


            var sx = obj[direction][frameAt].x;
            var sy = obj[direction][frameAt].y;
            var sWidth = obj.width;
            var sHeight = obj.height;
            var dx = x;
            var dy = y;
            var dWidth = obj.width * scale;
            var dHeight = obj.height * scale;


            context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        };

        //first atempt must be imroved after add the stage elements
        function fnCollide() {
            //        console.log('width', width);
            //        console.log('height', height);
            //        console.log('height + y', height + y);
            //        console.log(y);

            if (x == 0)
                vx = 0;
            if (x + width == 1024)
                vx = 0;


            if (y + height > 700)
                vy = -16;


        };

        function fnWhichImage() {

        };

        function fnMove(g) {
            //x-axys stop
            //            if (vx > 0)
            //                vx += -1;
            //            if (vx < 0)
            //                vx += 1;

            //Gravity
            //        vy += g;

            //Test Collision
            this.collide();

            //Increment the position
            x += vx;
            y += vy;


        };

        function fnControl(e) {
            e.preventDefault();

            //x-axys movement
            if (e.type == "keypress") {
                if (e.key == "d" || e.key == "D")
                    vx = 8;
                if (e.key == "a" || e.key == "A")
                    vx = -8;
            }
            if (e.type == "keyup") {
                if (e.key == "d" || e.key == "D")
                    vx = 0;
                if (e.key == "a" || e.key == "A")
                    vx = 0;

            }


            //y-axys movement
            if (e.key == "w" || e.key == "W") {
                if (vy == 0)
                    vy = -16;
            }



        }


    }
