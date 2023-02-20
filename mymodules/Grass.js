class Grass extends Living{

    chooseCell(ch) {
       return super.chooseCell(ch)
    }


    mul() {
        this.multiply++

        let emptyCells = this.chooseCell(0)
        let randomCell = random(emptyCells)

        if (this.multiply >= 8 && randomCell) {
            let newX = randomCell[0]
            let newY = randomCell[1]

            matrix[newY][newX] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }

}






