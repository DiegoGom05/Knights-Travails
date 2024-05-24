class Chessboard{
    constructor(size){
        this.size = size;
        this.board = this.createBoard(size)
    }
    createBoard(size){
        const columns = [];
        for(let i = 0; i < size; i++){
            const row = []
            for(let j = 0; j < size; j++){
                row.push(j)
            }
            columns.push(row)
        }
        return columns
    } printBoard() {
        for (let i = 0; i < this.size; i++) {
            console.log(this.board[i].join(" "));
        }
    }
}

class Knight{
    constructor(posx, posy){
        this.posx = posx;
        this.posy = posy;
    }
    knightMoves(chessboardSize) {
        const KNIGHT_MOVES = [
            [-2, 1], [-2, -1],
            [-1, -2], [1, -2],
            [2, -1], [2, 1],
            [1, 2], [-1, 2]
        ];
        return this.validMoves(KNIGHT_MOVES, chessboardSize);
    }

    validMoves(KNIGHT_MOVES, chessboardSize) {
        const validMoves = [];
        KNIGHT_MOVES.forEach(element => {
            const newPosx = this.posx + element[0];
            const newPosy = this.posy + element[1];

            if (newPosx >= 0 && newPosx < chessboardSize && newPosy >= 0 && newPosy < chessboardSize) {
                validMoves.push([newPosx, newPosy]);
            }
        });
        return validMoves;
    }

    knightTravail(start, finish, chessboardSize) {
        if (arraysEqual(start, finish)) {
            console.log("You're already at the finish point");
            return [start];
        }

        const queue = [[start, 0]];  
        const visited = new Set();
        visited.add(start.toString());
        const predecessors = new Map();  
        predecessors.set(start.toString(), null);
        while (queue.length > 0) {
            const [currentPosition, depth] = queue.shift();
            const [currentX, currentY] = currentPosition;
            
            this.posx = currentX;
            this.posy = currentY;

            const validMoves = this.knightMoves(chessboardSize);
            for (const move of validMoves) {
                if (arraysEqual(move, finish)) {
                    predecessors.set(move.toString(), currentPosition);
            console.log(predecessors)

                    return this.reconstructPath(predecessors, finish);
                }
                if (!visited.has(move.toString())) {
                    queue.push([move, depth + 1]);
                    visited.add(move.toString());
                    predecessors.set(move.toString(), currentPosition);
                }
            }
            console.log(predecessors)

        }

        return []; 
    }

    reconstructPath(predecessors, finish) {
        const path = [];
        let step = finish;
        while (step) {
            path.unshift(step);
            step = predecessors.get(step.toString());
        }
        return path;
    }

     
    

}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}



const chessboard = new Chessboard(8);
const knight = new Knight(0, 0); 
console.log(knight.knightTravail([knight.posx, knight.posy], [3, 3], chessboard.size))
