// grid values 0 == empty, 1 == obstacle, 2 == pipe straight, 3 == pipe turn up, 4 == pipe turn down, 5 == pipe turn left, 6 == pipe turn right, 7 pipe 't' split down, 8 = pipe 't' split up, 9 = pipe '+' split


export class gridManagement {
    
    public grid: Array<any>;

    constructor(public xCoOrd: number, public yCoOrd: number) {
        this.grid = Array(xCoOrd);
    }

    //standard inclusive random number range generation logic
    public getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public checkIfValidCoordinate(current, newCoOrd) {

        return (newCoOrd == current - 1 || newCoOrd == current + 1) && (newCoOrd > 0 && newCoOrd < 16);
    };


    public createGameGrid(xCoOrd: number, yCoOrd: number) {
        for (var x = 0; x < xCoOrd; x++) {
            var innerArray: number[];
            for (var y = 0; y < yCoOrd; y++) {
                innerArray.push(y);
            }
            this.grid[x].push(innerArray);
        }
    }

    //add one to the min and subtract one from the max for determining random obstacle locations.
    public randomTarget(xCoOrd: number, yCoOrd: number) {
        var target = [];
        var xTarget = this.getRandomIntInclusive(xCoOrd, yCoOrd);
        var yTarget = this.getRandomIntInclusive(xCoOrd, yCoOrd);
        target.push(xTarget);
        target.push(yTarget);
        return target;
    }

    public populateGridObstacles(numberOfObstacles: number) {
        for (var i = numberOfObstacles; i >= 0;) {
            var target = this.randomTarget(1, 13);
            var targetIsValid = this.checkIfTargetIsValidInArray(target[0].valueOf(), target[1].valueOf());
            if (targetIsValid) {
                this.grid[target[0].valueOf()][target[1].valueOf()] = 1;
                i--;
            } else {
                this.populateGridObstacles(i);
            }
        }
    }

    public checkIfTargetIsValidForPipePlacement(targetSquare: number, indexOfGrid: number) {
        return (this.grid[indexOfGrid][targetSquare] == 0);
    }

    public checkIfTargetIsValidInArray(targetSquare: number, indexOfGrid: number) {
        var bottomRowIsClear;
        var topRowIsClear;
        var rowIsClear;

        if (indexOfGrid == 0 && targetSquare == 0) {
            rowIsClear = this.grid[0][0] == 0 && this.grid[0][1] == 0;
            bottomRowIsClear = this.grid[1][0] == 0 && this.grid[1][1] == 0;

            return (bottomRowIsClear == true && rowIsClear == true);
        }

        if (indexOfGrid == 0 && targetSquare == 14) {
            rowIsClear = this.grid[0][14] == 0 && this.grid[0][13] == 0;
            bottomRowIsClear = this.grid[1][14] == 0 && this.grid[1][13] == 0;

            return (bottomRowIsClear == true && rowIsClear == true);
        }

        if (indexOfGrid == 0 && targetSquare != 0 && targetSquare != 14) {
            rowIsClear = this.grid[indexOfGrid][targetSquare] == 0 &&
                this.grid[indexOfGrid][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid][targetSquare - 1] == 0;
            bottomRowIsClear = this.grid[indexOfGrid + 1][targetSquare] == 0 &&
                this.grid[indexOfGrid + 1][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid + 1][targetSquare - 1] == 0;

            return (bottomRowIsClear == true && rowIsClear == true);
        }

        if (indexOfGrid > 0 && indexOfGrid < 14) {
            rowIsClear = this.grid[indexOfGrid][targetSquare] == 0 &&
                this.grid[indexOfGrid][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid][targetSquare - 1] == 0;
            topRowIsClear = this.grid[indexOfGrid - 1][targetSquare] == 0 &&
                this.grid[indexOfGrid - 1][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid - 1][targetSquare - 1] == 0;
            bottomRowIsClear = this.grid[indexOfGrid + 1][targetSquare] == 0 &&
                this.grid[indexOfGrid + 1][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid + 1][targetSquare - 1] == 0;

            return (bottomRowIsClear == true && rowIsClear == true && topRowIsClear == true);
        }

        if (indexOfGrid == 14 && targetSquare != 0 && targetSquare != 14) {
            rowIsClear = this.grid[indexOfGrid][targetSquare] == 0 &&
                this.grid[indexOfGrid][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid][targetSquare - 1] == 0;
            topRowIsClear = this.grid[indexOfGrid - 1][targetSquare] == 0 &&
                this.grid[indexOfGrid - 1][targetSquare + 1] == 0 &&
                this.grid[indexOfGrid - 1][targetSquare - 1] == 0;

            return (topRowIsClear == true && rowIsClear == true);
        }

        if (indexOfGrid == 14 && targetSquare == 0) {
            rowIsClear = this.grid[14][0] == 0 && this.grid[14][1] == 0;
            topRowIsClear = this.grid[13][0] == 0 && this.grid[13][1] == 0;

            return (topRowIsClear == true && rowIsClear == true);
        }

        if (indexOfGrid == 14 && targetSquare == 14) {
            rowIsClear = this.grid[14][14] == 0 && this.grid[14][13] == 0;
            topRowIsClear = this.grid[13][14] == 0 && this.grid[13][13] == 0;

            return (topRowIsClear == true && rowIsClear == true);
        }
    }
}