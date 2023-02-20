class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 50
        this.moveEnergy = 0
        this.direction = []
    }

    updateDirection() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(ch) {
        this.updateDirection()
        var found = [];
        for (let i in this.direction) {

            let x = this.direction[i][0]
            let y = this.direction[i][1]

            if (x >= 0 && y >= 0 && x <= matrix.length - 1 && y <= matrix.length - 1) {

                if (matrix[y][x] == ch) {
                    found.push(this.direction[i])
                }

            }
        }

        return found
    }

    move() {
        this.moveEnergy++
        if (this.moveEnergy >= 2) {
            this.energy--
            let arr = this.chooseCell(2)
            let arr2 = this.chooseCell(0)
            if (arr.length > 0) {
                this.eat()
            }
            else if (arr2.length > 0) {
                arr = this.chooseCell(0)
                let emptyCell = random(arr)
                if (emptyCell) {
                    let x = emptyCell[0]
                    let y = emptyCell[1]

                    matrix[y][x] = 3
                    matrix[this.y][this.x] = 0

                    this.x = x
                    this.y = y
                }
            }
            else {
                arr = this.chooseCell(1)
                let grassCell = random(arr)
                if (grassCell) {
                    let x = grassCell[0]
                    let y = grassCell[1]

                    matrix[y][x] = 3
                    matrix[this.y][this.x] = 1
                    for (var i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1)
                            break;
                        }
                    }
                    new Grass(this.x, this.y)
                    this.x = x
                    this.y = y
                }
            }
            if (this.energy >= 60) {
                this.mul()
            }

            if (this.energy <= 0) {
                this.die()
            }
            this.moveEnergy = 0
        }
    }
    eat() {
        var newCell = random(this.chooseCell(2))

        if (newCell) {
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }
            }

            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break
            }
        }
        console.log(predatorArr.length)
    }

    mul() {
        console.log(10)
        var newCell = random(this.chooseCell(0))
        if (this.energy >= 15 && newCell) {
            var newPredator = new Predator(newCell[0], newCell[1])
            predatorArr.push(newPredator)
            matrix[newCell[1]][newCell[0]] = 3
            this.energy = 50
        }
    }

}