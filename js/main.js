/* jshint esversion: 6 */

// ================================================================================================
//   Main Module
// ================================================================================================

const main = function() {

// =============================
//   Players
// =============================

const Players = {
    player1         : {name: "Player1"},
    player2         : { name: "Computer", type: "computer"},
    current         : 2,
    computersTurn   : false,
    switch          : function() {(this.current === 1) ? this.current = 2 : this.current = 1 },
    opposite        : function() {return (this.current === 1) ?  2 :  1  }
}

// =============================
//   Body Properties
// =============================
// use to call various versions of the Overlay
const bodyProps = {
    start       : { id: "start",
                    class: "screen screen-start", 
                    buttonText: "Start", 
                    message: "Select Your Options:", 
                    form: true,
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    winnerOne   : { id: "finish", 
                    class: `screen screen-win screen-win-one`, 
                    buttonText: "New Game", 
                    message: `Congratulations, ${Players.player1.name} You Won!`,
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    winnerTwo   : { id: "finish", 
                    class: `screen screen-win screen-win-two`,
                    buttonText: "New Game", 
                    message: `Congratulations, ${Players.player2.name} You Won!`,
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    tie         : { id: "finish", 
                    class: `screen screen-win screen-win-tie`, 
                    buttonText: "New Game", 
                    message: "Tie!",
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    updateNames : function () {
                    this.winnerOne.message = `Congratulations, ${Players.player1.name} You Won!`,
                    this.winnerTwo.message = `Congratulations, ${Players.player2.name} You Won!`               
                }
}

// Create a submit click event handler for each instance of button
const bindSubmit = () => {
    document.querySelector(".button").onclick = e => {
        const screen = document.querySelector(".screen");
        if (screen.classList.contains("screen-start")) {
            const player1Input = document.getElementById("name1");
            if (player1Input.value) Players.player1.name = player1Input.value;
            const player2Input = document.getElementById("name2"); 
            (player2Input.value) ? Players.player2.name = player2Input.value : Players.player2.name = player2Input.getAttribute("placeholder");           
        }
        bodyProps.updateNames();
        htmlComponents.setPlayers(Players);
        element.disappear(screen);
        board = buildBoard();
        Players.current = 2;
        showTurn();
    }
}

// Create form input events for each instance of form
const bindForm = () => {
    const player2Input = document.getElementById("name2");
    document.querySelector("#comp").onchange = e => {
        player2Input.setAttribute("placeholder", "Computer" )
        player2Input.setAttribute("disabled", "");
        player2Input.parentElement.classList.add("disabled");
        Players.player2.type = "computer";
    }
    document.querySelector("#human").onchange = e => {
        player2Input.setAttribute("placeholder", "Player 2" )
        player2Input.removeAttribute("disabled");
        player2Input.parentElement.classList.remove("disabled");
        Players.player2.type = "human";
    }

}


// Display the HTML on the page
const body = document.querySelector("body");
body.innerHTML = htmlComponents.body(bodyProps.start);
bindSubmit();
bindForm();
    

// =============================
//   Game Logic
// =============================
body.onclick = e => {
    
    if (e.target.classList.contains("box") && !Players.computersTurn) {
        const square = checkOwnership(e.target);
        if (square) {
            square.ownedBy = Players.current;
            // In case user hovered over square during computer's turn;
            square.element.classList.add(`box-filled-${Players.current}`);
            let didWin =  checkWin();
            if (!didWin) {
                checkComputerMove();
            }
        }
    }
}





// Add the player's symbol when mouse hovers over square
body.onmouseover = e => {
    if (e.target.classList.contains("box") && !Players.computersTurn) {
        if (checkOwnership(e.target)) e.target.classList.add(`box-filled-${Players.current}`);
    }
};

// Remove player's symbol when mouse leaves square
body.onmouseout = e => {
    if (e.target.classList.contains("box") && !Players.computersTurn) {
        if (checkOwnership(e.target)) e.target.classList.remove(`box-filled-${Players.current}`);
    }
};

/**
 * Check to see if current square being hovered over is owned by a player
 * 
 * @param {object} currentBox The current element event was triggerd on
 * @return {object | false} The square that matches to currentBox if owned or false if not
 */
const checkOwnership = (currentBox) => {
    let owned = false;
    board.forEach( (square) => {
        if (currentBox === square.element && square.ownedBy === "none") {
            owned = square;
        }
    });
    return owned;
    };

// Show whose turn it is in header
const showTurn = () => {
    document.getElementById(`player${Players.current}`).classList.remove("active");
    Players.switch();
    document.getElementById(`player${Players.current}`).classList.add("active");
};


// =============================
//   Check for Winner
// ============================= 

// check to see if player won
const checkWin = () => {
    let didWin = false;
    clickSound.play();
    const playerBoard = board.filter(square => square.ownedBy === Players.current);
    // check if player contains diagonal win
    function isDiag() {
        let hasDiag = false;
        if (playerBoard.find(square => square.isAt({row: 1, column: 1}))) {
            if (playerBoard.find(square => square.isAt({row: 0, column: 0})) && 
                playerBoard.find(square => square.isAt({row: 2, column: 2}))) {
                hasDiag = true;
            } else if (playerBoard.find(square => square.isAt({row: 0, column: 2})) && 
                        playerBoard.find(square => square.isAt({row: 2, column: 0}))) {
                hasDiag = true;
            }
        }
        return hasDiag;
    }
    // really long conditional statement to test playerboard to win patterns (must... find... better... way...)
    if ( playerBoard.filter(square => square.location.row === 0).length === 3 ||
            playerBoard.filter(square => square.location.row === 1).length === 3 ||
            playerBoard.filter(square => square.location.row === 2).length === 3 ||
            playerBoard.filter(square => square.location.column === 0).length === 3 ||
            playerBoard.filter(square => square.location.column === 1).length === 3 ||
            playerBoard.filter(square => square.location.column === 2).length === 3 ||
            isDiag() 
        )
    {
        // Display winner screen
        body.innerHTML = htmlComponents.body((Players.current === 1) ? bodyProps.winnerOne : bodyProps.winnerTwo);
        bindSubmit();
        didWin = true;
    } else if (board.filter(square => square.ownedBy === "none").length === 0) {
        // Display Tie screen
        body.innerHTML = htmlComponents.body(bodyProps.tie);
        bindSubmit();
        didWin = true;
    }
    showTurn();
    return didWin;
};




// =============================
//   Board
// ============================= 
// Array to hold the Square objects
let board = []; 

// An individual square object of tic-tac-toe board
class Square {
    constructor(location, ownedBy = "none") {
        this.location = location;
        this.ownedBy = ownedBy;
        this.element = document.querySelectorAll(".box")[(this.location.row * 3) + this.location.column];
        this.isAt = function (loc) { return (this.location.row === loc.row && this.location.column === loc.column) ? true : false; };
    }
}

// Build an array of squares representing tic-tac-toe board
const buildBoard = () => {
    let tempArray = [];
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            tempArray.push(new Square({row: r, column: c}));
        }  
    }
    return tempArray;
};

// =============================
//   AI
// =============================
// Basic Strategy *****************************************
    // 1. always go for middle on first move. If taken pick a random square
    // 2. check if there is a win on this move
    // 3. check if opponent can win on this move
    // 4. randomly choose from remainder of board

const checkComputerMove = () => {
    // Basic Pattern searching
    const checkDiag = (player) => {
        let hasDiag = false;
        // check if center is taken by player
        if (board[4].ownedBy === player) {
            // If so, check each corner
            if (board[0].ownedBy === player && board[8].ownedBy === "none") hasDiag = board[8]; 
            if (board[8].ownedBy === player && board[0].ownedBy === "none") hasDiag = board[0]; 
            if (board[2].ownedBy === player && board[6].ownedBy === "none") hasDiag = board[6]; 
            if (board[6].ownedBy === player && board[2].ownedBy === "none") hasDiag = board[2];    
        } else if  (board[4].ownedBy === "none") {
            // If center is open, check opposite corners at a time
            if (board[0].ownedBy === player && board[8].ownedBy === player) hasDiag = board[4];
            if (board[2].ownedBy === player && board[6].ownedBy === player) hasDiag = board[4];
        }
        console.log(hasDiag);
        return hasDiag;
    }

    const checkLine = (player, direction) => {
        let emptySquare = false;
        for (let i = 0; i < 3; i++) {     
            if (board.filter(square => square.location[direction] === i && square.ownedBy === player).length === 2) {
                if (board.filter(square => square.location[direction] === i && square.ownedBy === "none").length === 1) {
                    emptySquare = board.filter(square => square.location[direction] === i && square.ownedBy === "none")[0];
                }
            }
        }
        return emptySquare;
    }

    // check if there is a 2 in a row pattern, if so return the blank square, otherwise return false
    const checkPattern = player => {
        let emptySquare = false;

        // check rows first
         emptySquare = checkLine(player, "row");
        if (!emptySquare) {
            // then columns if no rows are found
            emptySquare = checkLine(player, "column");
        }
        
        return emptySquare;
    }


    if (Players.player2.type != "computer") return;
    Players.computersTurn = true;

    // For now, pull using the board index at 4 for the midddle square. Make more robust after converting board to object
    let targetSquare = board[4];
    if (targetSquare.ownedBy != "none") {
        // If a current player has two squares in a diagonal, go for the win  
        if (checkDiag(Players.current)) {
            targetSquare = checkDiag(Players.current);
            targetSquare.ownedBy = Players.current;
        // If a current player has two squares in a row, go for the win  
        } else if (checkPattern(Players.current)) {
            targetSquare = checkPattern(Players.current);
            targetSquare.ownedBy = Players.current;
        // If a opposite player has two squares in a diagonal, try to block it
        } else if (checkDiag(Players.opposite())) {
            targetSquare = checkDiag(Players.opposite());
            targetSquare.ownedBy = Players.current;
        // If a opposite player has two squares in a row, try to block it
        } else if (checkPattern(Players.opposite())) {
            targetSquare = checkPattern(Players.opposite());
            targetSquare.ownedBy = Players.current;
        // if no pattern detected choose a random square, don't want to make it too hard for a human player by going any deeper
        } else { 
            const openBoard = board.filter(square => square.ownedBy === "none");
            const randomSquare = getRandom(openBoard.length);
            targetSquare = checkOwnership(openBoard[randomSquare].element); 
        }
      
    }
    // Set a delay before computer finishes turn to allow visual and audio elements to catch up
    setTimeout(() => {
        targetSquare.element.classList.add(`box-filled-${Players.current}`);
        targetSquare.ownedBy = Players.current;
        checkWin();
        Players.computersTurn = false;
    }, 400); 

}

/**
 * Select a random number within given bounds
 * @param {integer} upperRange 
 * @param {integer} lowerRange defaults to zero
 */
const getRandom = (upperRange, lowerRange = 0 ) => {
    return Math.floor(Math.random() * (upperRange - lowerRange)) + lowerRange; 
}



// =============================
//   Sounds
// =============================
const clickSound = new Audio();
clickSound.src = "./aud/Click2-Sebastian-759472264.mp3";

}();