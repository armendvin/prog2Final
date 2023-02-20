class Spawner {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.spawnEnergy = 0
    }

    spawn() {
        this.spawnEnergy++
        if (this.spawnEnergy >= 10) {
            var x = this.x
            var y = this.y - 1
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
            for (var i in predatorArr) {
                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
            if (grassArr.length > grassEaterArr.length) {
                if (grassEaterArr.length > predatorArr.length) {
                    var pr = new Predator(this.x, this.y - 1)
                    predatorArr.push(pr)
                    console.log("predator");
                }
                else if (predatorArr.length > grassEaterArr.length) {
                     var ge = new GrassEater(this.x, this.y - 1)
                    grassEaterArr.push(ge)
                    console.log("grassEater");
                }
                else {
                    var rand = Math.round(Math.random())
                    if (rand == 1) {
                        var pr = new Predator(this.x, this.y - 1)
                        predatorArr.push(pr)
                        console.log("predator");
                    }
                    else {
                        var ge = new GrassEater(this.x, this.y - 1)
                        grassEaterArr.push(ge)
                        console.log("grassEater");
                    }
                }
            }
            else if (grassArr.length < grassEaterArr.length) {
                if (grassArr.length > predatorArr.length) {
                    var pr = new Predator(this.x, this.y - 1)
                    predatorArr.push(pr)
                }
                else if (predatorArr.length > grassArr.length) {
                    var gr = new Grass(this.x, this.y - 1)
                    grassArr.push(gr)
                }
                else {
                    var rand = Math.round(Math.random())
                    if (rand == 1) {
                        var pr = new Predator(this.x, this.y - 1)
                        predatorArr.push(pr)
                        console.log("predator");
                    }
                    else {
                        var gr = new Grass(this.x, this.y - 1)
                        grassArr.push(gr)
                        console.log("grass")
                    }
                }
            }
            else{
                if (grassEaterArr.length > predatorArr.length) {
                    var pr = new Predator(this.x, this.y - 1)
                    predatorArr.push(pr)
                }
                else if (predatorArr.length > grassEaterArr.length) {
                    var rand = Math.round(Math.random())
                    if (rand == 1) {
                        var ge = new GrassEater(this.x, this.y - 1)
                        grassEaterArr.push(ge)
                        console.log("grassEater");
                    }
                    else {
                        var gr = new Grass(this.x, this.y - 1)
                        grassArr.push(gr)
                        console.log("grass")
                    }
                }
                else {
                    console.log("equal");
                    var rand = Math.round(Math.random() * 3)
                    if (rand == 1) {
                        var pr = new Predator(this.x, this.y - 1)
                        predatorArr.push(pr)
                        console.log("predator");
                    }
                    else if (rand == 2) {
                        var ge = new GrassEater(this.x, this.y - 1)
                        grassEaterArr.push(ge)
                        console.log("grassEater");
                    }
                    else {
                        var gr = new Grass(this.x, this.y - 1)
                        grassArr.push(gr)
                        console.log("grass")
                    }
                }
            }
            this.spawnEnergy = 0
        }
    }
}   