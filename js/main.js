/* jshint esversion: 6 */

// ================================================================================================
//  element module for showing and hiding elements
// ================================================================================================
const element = function() {    
    /**
     * Hide an element
     * @param {object} element  The element to hide
     */
    const hide = (element) => {
        element.classList.add("hide");
    };

    /**
     * Show an element
    * @param {object} element  The element to show
    */
    const show = (element) => {
        element.classList.remove("hide");
    };
    /**
    * Make an element "disappear"
    * @param {object} element  The element to show
    */
    const disappear = (element) => {
        element.classList.add("disappear");
        // after the css transition time, hide the element completly
        setTimeout(() => {
            hide(element);
            element.classList.remove("disappear");
        }, 2000);
    };
    return {hide: hide, show: show, disappear: disappear};
}();

// End element module
// ================================================================================================



// ================================================================================================
//   HTML Components Module
// ================================================================================================
const htmlComponents = function() {
    // HTML for inputs 
    const form = () => {
        return `
            <form>
                <label>Please Enter a Name for Player 1<br>
                    <input type="text" id="name1" placeholder="Player1" name="name1"/>
                </label><br>
                <fieldset class="radioGroup">
                    <legend>Pick Opponent</legend>
                    <input type="radio" id="comp" value="computer" name="playerType" checked><label for="comp">Computer</label><br>
                    <input type="radio" id="human" value="human" name="playerType"><label for="human">Human</label><br>
                </fieldset>
                <label class="disabled">Please Enter a Name for Player 2<br>
                    <input type="text" id="name2" placeholder="Computer" name="name2" disabled/>
                </label><br>
            </form>
        `;
    }


    // HTML for Overlay header (private)   
    const header = (prop) => {
        return `
            <header>
                <h1>Tic Tac Toe</h1>
                <p class="message">${prop.message}</p>
                ${(prop.form) ? form() : ""}
                <a href="#" class="button">${prop.buttonText}</a>
            </header>
        `;
    }

    // HTML for Overlay (private)
    const overlay = (prop) => {
        return `
            <div class="${prop.class}" id="${prop.id}">
                ${header({buttonText: prop.buttonText, message: prop.message, form: prop.form})}
            </div>
        `;
    };

    // HTML for Players Turn
    const players = (prop) => {
        return `
        <h1>Tic Tac Toe</h1>
        <ul>
            <li class="players" id = "player1">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
                <h1>${prop.player1}</h1>
            </li>
            <li class="players" id = "player2">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
                <h1>${prop.player2}</h1>
            </li>
        </ul>
        `;
    }
    // HTML for main body (public)
    const body = (prop) => {
        
        return`
            <div class="board" id="board">
                <header id="header--board">
                    ${players({player1: prop.player1, player2: prop.player2})}
                </header>
                <ul class="boxes">
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li>
                    <li class="box"></li> 
                    <li class="box"></li>
                </ul>
            </div>   
            ${overlay({id: prop.id, class: prop.class, buttonText: prop.buttonText, message: prop.message, form: prop.form})}         
        `;
    }

    // HTML for Modal (public)

    // Update PlayerNames
    const setPlayers = (prop) => {
        document.querySelector("#header--board").innerHTML = players({player1: prop.player1.name, player2: prop.player2.name});
    }

    // Export functions to access from global namespace
    return {body, setPlayers};
}();

// End htmlComponents module
// ================================================================================================


// ================================================================================================
//   Main Module
// ================================================================================================

const main = function() {

// =============================
//   Players
// =============================

const Players = {
    player1         : {name: "Player1"},
    player2         : { name: "Computer",
                        type: "computer"},
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
                    message: "Winner!",
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    winnerTwo   : { id: "finish", 
                    class: `screen screen-win screen-win-two`,
                    buttonText: "New Game", 
                    message: "Winner!",
                    player1: Players.player1.name,
                    player2: Players.player2.name },
    tie         : { id: "finish", 
                    class: `screen screen-win screen-win-tie`, 
                    buttonText: "New Game", 
                    message: "Tie!",
                    player1: Players.player1.name,
                    player2: Players.player2.name },
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
body.onmouseover = (e) => {
    if (e.target.classList.contains("box") && !Players.computersTurn) {
        if (checkOwnership(e.target)) e.target.classList.add(`box-filled-${Players.current}`);
    }
};

// Remove player's symbol when mouse leaves square
body.onmouseout = (e) => {
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
        // setTimeout ( () => {
            body.innerHTML = htmlComponents.body((Players.current === 1) ? bodyProps.winnerOne : bodyProps.winnerTwo);
            bindSubmit();
            didWin = true;
        // }, 300);
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

// TODO Convert board from an array to an object, and refactor all related functions as methods
// const Board = {
//     squares : [],
//     build   : function () {
//                 let tempArray = [];
//                 for (let r = 0; r < 3; r++) {
//                     for (let c = 0; c < 3; c++) {
//                         tempArray.push(new Square({row: r, column: c}));
//                     }  
//                 }
//                 this.squares = tempArray;
//             }
// }




// Array to hold the Square objects
let board = []; 

// An individual square object of tic-tac-toe board
function Square(location, ownedBy = "none") {
    this.location = location;
    this.ownedBy = ownedBy;
    this.element = document.querySelectorAll(".box")[(this.location.row * 3) + this.location.column];
    this.isAt = function(loc) {return (this.location.row === loc.row && this.location.column === loc.column) ? true : false};
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
        console.log(board);
        checkWin();
        Players.computersTurn = false;
    }, 400); 

}

const getRandom = (upperRange, lowerRange = 0 ) => {
    return Math.floor(Math.random() * (upperRange - lowerRange)) + lowerRange; 
}



// =============================
//   Sounds
// =============================
const clickSound = new Audio();
clickSound.src = "./aud/Click2-Sebastian-759472264.mp3";

}();