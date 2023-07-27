class Model {
    constructor(board) {
        this.board = board;
    }
}

class View {
    cell0;
    cell1;
    cell2;
    cell3;
    cell4;
    cell5;
    cell6;
    cell7;
    cell8;

    constructor() {
        this.root = document.getElementById("root");

        let tableEl = document.createElement("table");

        let td0 = document.createElement("td");
        td0.setAttribute("id", "c0");
        this.cell0 = td0;
        let td1 = document.createElement("td");
        td1.setAttribute("id", "c1");
        this.cell1 = td1;
        let td2 = document.createElement("td");
        td2.setAttribute("id", "c2");
        this.cell2 = td2;
        let td3 = document.createElement("td");
        td3.setAttribute("id", "c3");
        this.cell3 = td3;
        let td4 = document.createElement("td");
        td4.setAttribute("id", "c4");
        this.cell4 = td4;
        let td5 = document.createElement("td");
        td5.setAttribute("id", "c5");
        this.cell5 = td5;
        let td6 = document.createElement("td");
        td6.setAttribute("id", "c6");
        this.cell6 = td6;
        let td7 = document.createElement("td");
        td7.setAttribute("id", "c7");
        this.cell7 = td7;
        let td8 = document.createElement("td");
        td8.setAttribute("id", "c8");
        this.cell8 = td8;

        let row1 = document.createElement("tr");
        let row2 = document.createElement("tr");
        let row3 = document.createElement("tr");

        row1.appendChild(td0);
        row1.appendChild(td1);
        row1.appendChild(td2);
        row2.appendChild(td3);
        row2.appendChild(td4);
        row2.appendChild(td5);
        row3.appendChild(td6);
        row3.appendChild(td7);
        row3.appendChild(td8);

        tableEl.append(row1, row2, row3);
        this.root.appendChild(tableEl);
    }

    bindClickEvent(handler) {
        this.cell0.addEventListener("click", (event) => {
            let token = handler(0, 0);
            if (token == "EG") {
                this.placeTokenView(this.cell0, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell0, token);
            }
        });
        this.cell1.addEventListener("click", (event) => {
            let token = handler(0, 1);
            if (token == "EG") {
                this.placeTokenView(this.cell1, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell1, token);
            }
        });
        this.cell2.addEventListener("click", (event) => {
            let token = handler(0, 2);
            if (token == "EG") {
                this.placeTokenView(this.cell2, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell2, token);
            }
        });
        this.cell3.addEventListener("click", (event) => {
            let token = handler(1, 0);
            if (token == "EG") {
                this.placeTokenView(this.cell3, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell3, token);
            }
        });
        this.cell4.addEventListener("click", (event) => {
            let token = handler(1, 1);
            if (token == "EG") {
                this.placeTokenView(this.cell4, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell4, token);
            }
        });
        this.cell5.addEventListener("click", (event) => {
            let token = handler(1, 2);
            if (token == "EG") {
                this.placeTokenView(this.cell5, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell5, token);
            }
        });
        this.cell6.addEventListener("click", (event) => {
            let token = handler(2, 0);
            if (token == "EG") {
                this.placeTokenView(this.cell6, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell6, token);
            }
        });
        this.cell7.addEventListener("click", (event) => {
            let token = handler(2, 1);
            if (token == "EG") {
                this.placeTokenView(this.cell7, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell7, token);
            }
        });
        this.cell8.addEventListener("click", (event) => {
            let token = handler(2, 2);
            if (token == "EG") {
                this.placeTokenView(this.cell8, token);
                this.clearScreen();
            } else {
                this.placeTokenView(this.cell8, token);
            }
        });
    }

    placeTokenView(cell, token) {
        cell.innerHTML = token;
        cell.style.color = token === "X" ? "#ff3d00" : "#2979ff";
    }

    clearScreen() {
        this.cell0.innerHTML = "";
        this.cell1.innerHTML = "";
        this.cell2.innerHTML = "";
        this.cell3.innerHTML = "";
        this.cell4.innerHTML = "";
        this.cell5.innerHTML = "";
        this.cell6.innerHTML = "";
        this.cell7.innerHTML = "";
        this.cell8.innerHTML = "";
    }

    playerTurn(turn) {
        let h1 = document.getElementById("turn");
        h1.innerHTML = `Player's turn: ${turn}`;
    }
}

class Controller {
    model;
    view;
    game;

    constructor(model, view, game) {
        this.model = model;
        this.view = view;
        this.game = game;

        this.view.bindClickEvent(this.playMoveHandle);
    }

    playMoveHandle = (row, column) => {
        console.log(this.model);
        this.model.board.placeToken(row, column, this.game.whoseTurn());
        let thisTurn = this.game.whoseTurn();
        let isEndGame = this.game.checkWinner(this.model.board.data);

        console.log(isEndGame);
        if (isEndGame == "EG") {
            if (thisTurn == this.game.player1.token) {
                alert("Player 1 is the winner!");
            } else {
                alert("Player 2 is the winner!");
            }
            this.model.board.clear();
            return isEndGame;
        } else {
            this.game.changeTurn();
            this.view.playerTurn(this.game.whoseTurn());
            return thisTurn;
        }
    };
}

class Game {
    constructor() {
        this.player1 = {
            token: "X",
            name: "",
        };
        this.player2 = {
            token: "O",
            name: "",
        };
        this.turn = this.player1.token;
    }

    whoseTurn() {
        return this.turn;
    }

    changeTurn() {
        if (this.turn == this.player1.token) {
            this.turn = this.player2.token;
        } else {
            this.turn = this.player1.token;
        }
    }

    checkWinner(board) {
        console.log("Check winner board:", board);
        let winnerOptions = [
            [
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
            ],
            [
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 1, y: 2 },
            ],
            [
                { x: 2, y: 0 },
                { x: 2, y: 1 },
                { x: 2, y: 2 },
            ],
            [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 2, y: 2 },
            ],
            [
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 2, y: 0 },
            ],
            [
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 },
            ],
            [
                { x: 0, y: 1 },
                { x: 1, y: 1 },
                { x: 2, y: 1 },
            ],
            [
                { x: 0, y: 2 },
                { x: 1, y: 2 },
                { x: 2, y: 2 },
            ],
        ];
        // for (const e of winnerOptions) {
        let returnState = false;

        for (let index = 0; index < winnerOptions.length; index++) {
            console.log("e", winnerOptions[index]);
            let a = board[winnerOptions[index][0].x][winnerOptions[index][0].y];
            let b = board[winnerOptions[index][1].x][winnerOptions[index][1].y];
            let c = board[winnerOptions[index][2].x][winnerOptions[index][2].y];

            console.log(a, b, c);
            if (a && b && c) {
                if (a === b && b === c) {
                    console.log("vitoria detectada");
                    returnState = "EG";
                    break;
                } else {
                    console.log("sem vitoria");
                    returnState = false;
                }
            } else {
                console.log("board incompleto");
                returnState = false;
            }
        }

        // winnerOptions.forEach((e) => {
        //     console.log("e", e);
        //     let a = board[e[0].x][e[0].y];
        //     let b = board[e[1].x][e[1].y];
        //     let c = board[e[2].x][e[2].y];

        //     console.log(a, b, c);
        //     if (a && b && c) {
        //         if (a === b && b === c) {
        //             console.log("vitoria detectada");
        //             returnState = "EG";
        //             return;
        //         } else {
        //             console.log("sem vitoria");
        //             returnState = false;
        //         }
        //     } else {
        //         console.log("board incompleto");
        //         returnState = false;
        //     }
        // });

        return returnState;
    }
}

class Board {
    constructor() {
        this.data = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }

    clear() {
        this.data = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }

    placeToken(x, y, token) {
        this.data[x][y] = token;
        console.log(this.data);
    }
}

const app = new Controller(new Model(new Board()), new View(), new Game());
