/* jshint esversion: 6 */

+function() {

    // Wait until HTML loads to begin program
    document.addEventListener('DOMContentLoaded', () => {
        'use strict'; 

        //=============================
        //  Generic helper functions
        //=============================
        /**
         * Hide an element
         * @param {object} element  The element to hide
         */
        const hideElement = (element) => {
            element.classList.add("hide");
        };
    
        /**
         * Show an element
        * @param {object} element  The element to show
        */
        const showElement = (element) => {
            element.classList.remove("hide");
        };
        /**
        * Make an element "disappear"
        * @param {object} element  The element to show
        */
        const disappearElement = (element) => {
            element.classList.add("disappear");
            // after the css transition time, hide the element completly
            setTimeout(() => {
                hideElement(element);
                element.classList.remove("disappear");
            }, 2000);
        };


        // =============================
        //   Load Screen
        // =============================

        const createLoadScreen = () => {
            const loadScreen = document.createElement("div");
            loadScreen.className = "screen screen-start";
            loadScreen.setAttribute("id", "start");
            loadScreen.innerHTML = `
                <header>
                    <h1>Tic Tac Toe</h1>
                    <a href="#" class="button">Start game</a>
                </header>`;
            document.querySelector("body").appendChild(loadScreen);

            loadScreen.querySelector(".button").onclick = () => disappearElement(loadScreen);
            return loadScreen;
        }
        createLoadScreen();
        


        // =============================
        //   Game Logic
        // =============================
 
        // Give ownership of square to current player when mouse is clicked in square
        const boxes = document.querySelector(".boxes");
        boxes.onclick = (e) => {
            const square = checkOwnership(e.target);
            if (square) {
                square.ownedBy = playerTurn;
                checkWin();
            }
        }
        // Add the player's symbol when mouse hovers over square
        boxes.onmouseover = (e) => {
            if (checkOwnership(e.target)) e.target.classList.add(`box-filled-${playerTurn}`);
        };

        // Remove player's symbol when mouse leaves square
        boxes.onmouseout = (e) => {
            if (checkOwnership(e.target)) e.target.classList.remove(`box-filled-${playerTurn}`);
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
            document.getElementById(`player${playerTurn}`).classList.remove("active");
            (playerTurn === 1) ? playerTurn = 2 : playerTurn = 1;
            document.getElementById(`player${playerTurn}`).classList.add("active");
        };

        // check to see if player won
        const checkWin = () => {
            clickSound.play();
            const playerBoard = board.filter(square => square.ownedBy === playerTurn);
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
                alert(`player ${playerTurn} wins!`);
            } else if (board.filter(square => square.ownedBy === "none").length === 0) alert("Cat!");

            showTurn();
        };

        // =============================
        //   Players
        // =============================
        let playerTurn = 2; 
        showTurn();

        // =============================
        //   Board
        // ============================= 
        // An individual square object of tic-tac-toe board
        function Square(location, ownedBy = "none") {
            this.location = location;
            this.ownedBy = ownedBy;
            this.element = boxes.querySelectorAll(".box")[(this.location.row * 3) + this.location.column];
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

        const board = buildBoard();


        // =============================
        //   AI
        // =============================

        // =============================
        //   Sounds
        // =============================
        const clickSound = new Audio();
        clickSound.src = "./aud/Click2-Sebastian-759472264.mp3";
    });
}();