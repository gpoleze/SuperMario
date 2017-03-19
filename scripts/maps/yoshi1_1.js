;
(function (block, canvas) {
    "use strict";


    function mountMap(block, canvas) {
        var canvas = canvas;
        var block = block;
        //        console.log("block", block);
        //        console.log("canvas", canvas);
        //        console.log("w/block", canvas.width / block);
        //        console.log("h/block", canvas.height / block);


        var map = [];

        for (var i = 0; i < canvas.width / block; i++) {
            map[i] = [];
            for (var j = 0; j < canvas.height / block; j++) {
                if (i > 5 && j == 24)
                    map[i][j] = {
                        sx: 154,
                        sy: 99,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (j > 24)
                    map[i][j] = {
                        sx: 154,
                        sy: 116,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (i == 5 && j == 21)
                    map[i][j] = {
                        sx: 154,
                        sy: 150,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (i < 6 && j == 21)
                    map[i][j] = {
                        sx: 154,
                        sy: 99,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (i < 6 && j > 21)
                    map[i][j] = {
                        sx: 154,
                        sy: 116,
                        sWidth: 16,
                        sHeight: 16
                    };

                else if (i == 11 && j == 20)
                    map[i][j] = {
                        sx: 120,
                        sy: 150,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if ((i > 11 && i < 16) && j == 20)
                    map[i][j] = {
                        sx: 154,
                        sy: 99,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (i == 16 && j == 20)
                    map[i][j] = {
                        sx: 154,
                        sy: 150,
                        sWidth: 16,
                        sHeight: 16
                    };
                else if (i == 20 )
                    map[i][j] = {
                        sx: 154,
                        sy: 150,
                        sWidth: 16,
                        sHeight: 16
                    };
                
                else
                    map[i][j] = false;
            }
        }

        return map;
    }
    window.getMap = fnGetMap;

    function fnGetMap(block, canvas) {
        return mountMap(block, canvas);
    }

})();
