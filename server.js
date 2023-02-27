var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static("mymodules"));
app.get('/', function (req, res) {
res.redirect('index.html');
});
server.listen(3000);


side = 10
grassArr = []
grassEaterArr = []
predatorArr = []
spawnerArr = []
laserArr = []


Grass = require('./mymodules/Grass')
GrassEater = require('./mymodules/GrassEater')
Predator = require('./mymodules/Predator')
Laser = require('./mymodules/Laser')
Spawner = require('./mymodules/Spawner')
function generateMatrix(xLength, yLength, GrassCount, GrassEaterCount, PredatorCount, SpawnerCount, LaserCount) {
    var matrix = []
    for (let i = 0; i < yLength; i++) {
        matrix[i] = []
        for (let j = 0; j < xLength; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < SpawnerCount; i++) {
        var a = 0
        while (a == 0) {
            let x = Math.floor(Math.random() * xLength)
            let y = Math.floor(Math.random() * yLength)
            if (matrix[y][x] == 0 && x >= 15 && y >= 15 && y <= matrix.length - 15 && x <= matrix[0].length - 15) {
                matrix[y][x] = 4
                matrix[y + 1][x] = 5
                matrix[y - 1][x - 1] = 5
                matrix[y + 1][x - 1] = 5
                matrix[y + 1][x + 1] = 5
                matrix[y][x + 1] = 5
                matrix[y - 1][x + 1] = 5
                matrix[y][x - 1] = 5
                a++
            }
        }
    }

    for (let i = 0; i < LaserCount; i++) {
        var a = 0
        while (a == 0) {
            let x = Math.floor(Math.random() * xLength)
            let y = Math.floor(Math.random() * yLength)
            if (matrix[y][x] == 0 && x >= 5 && y >= 5 && y <= matrix.length - 5 && x <= matrix[0].length - 5) {
                matrix[y][x] = 6
                matrix[y + 1][x] = 7
                matrix[y - 1][x] = 7
                matrix[y - 1][x - 1] = 7
                matrix[y + 1][x - 1] = 7
                matrix[y + 1][x + 1] = 7
                matrix[y][x + 1] = 7
                matrix[y - 1][x + 1] = 7
                matrix[y][x - 1] = 7
                a++
            }
        }
    }


    for (let i = 0; i < GrassCount; i++) {
        var x = Math.floor(Math.random() * xLength)
        var y = Math.floor(Math.random() * yLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < GrassEaterCount; i++) {
        let x = Math.floor(Math.random() * xLength)
        let y = Math.floor(Math.random() * yLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }

    }
    for (let i = 0; i < PredatorCount; i++) {
        let x = Math.floor(Math.random() * xLength)
        let y = Math.floor(Math.random() * yLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    return matrix
}

function createObjects(){
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y)
                grassEaterArr.push(ge)
            }
            else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y)
                predatorArr.push(pr)
            }
            else if (matrix[y][x] == 4) {
                var sp = new Spawner(x, y)
                spawnerArr.push(sp)
            }
            else if (matrix[y][x] == 6) {
                var ls = new Laser(x, y)
                laserArr.push(ls)
            }
        }
    }
}

matrix = generateMatrix(60, 60, 1800, 1000, 800, 20, 21)

io.on('connection', function (socket) {
    createObjects()
    socket.emit("send matrix",matrix);
});
function drawing(matrix) {

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].move()
    }
    for (let i in predatorArr) {
        predatorArr[i].move()
    }
    for (let i in spawnerArr) {
        spawnerArr[i].spawn()
    }
    for (let i in laserArr) {
        laserArr[i].turn()
    }

    for (let y = 0; y < matrix.length; y++) {

        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green")
            }
            else if (matrix[y][x] == 2) {
                fill("orange")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 5 || matrix[y][x] == 7) {
                fill("black")
            }
            else if (matrix[y][x] == 4 || matrix[y][x] == 6) {
                fill("#8f1818")
            }
            else if (matrix[y][x] == 8) {
                fill("#22dae0")
            }
            else {
                fill("#acacac")
            }


            rect(x * side, y * side, side, side)


        }
    }

}