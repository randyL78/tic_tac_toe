/* jshint esversion: 6 */

+function ticTacToe() {

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

        // HTML for Overlay header
        const headerHTML = (prop) => {
            return `
                <header>
                    <h1>Tic Tac Toe</h1>
                    <p class="message">${prop.message}</p>
                    <a href="#" class="button">${prop.buttonText}</a>
                </header>
            `;
        }

        // HTML for Overlay
        const overlayHTML = (prop) => {
            return `
                <div class="${prop.class}" id="${prop.id}">
                    ${headerHTML({buttonText: prop.buttonText, message: prop.message, handleSubmit: prop.handleSubmit})}
                </div>
            `;
        };


        const bodyHTML = (prop) => {
            return`
                <div class="board" id="board">
                    <header>
                    <h1>Tic Tac Toe</h1>
                    <ul>
                        <li class="players" id = "player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
                        <li class="players" id = "player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
                    </ul>
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
                ${overlayHTML({id: prop.id, class: prop.class, buttonText: prop.buttonText, message: prop.message, handleSubmit: prop.handleSubmit})}         
            `
        }

        // Display the HTML on the page
        const body = document.querySelector("body");
        body.innerHTML = bodyHTML({id: "start", class: "screen screen-start", buttonText: "Start", message: "" });
        const overlay = document.querySelector(".screen");
        body.onclick = e => {
            if (e.target.classList.contains("button")) {
                disappearElement(document.querySelector(".screen"));
                board = buildBoard();
                console.log(board);
            } else if (e.target.classList.contains("box")) {
                const square = checkOwnership(e.target);
                if (square) {
                    square.ownedBy = playerTurn;
                    checkWin();
                }
            }
        }
      


        // =============================
        //   Game Logic
        // =============================
 
    
        // Add the player's symbol when mouse hovers over square
        body.onmouseover = (e) => {
            if (e.target.classList.contains("box")) {
                if (checkOwnership(e.target)) e.target.classList.add(`box-filled-${playerTurn}`);
            }
        };

        // Remove player's symbol when mouse leaves square
        body.onmouseout = (e) => {
            if (e.target.classList.contains("box")) {
                if (checkOwnership(e.target)) e.target.classList.remove(`box-filled-${playerTurn}`);
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
                body.innerHTML = bodyHTML({id: "finish", class: `screen screen-win screen-win-${(playerTurn === 1) ? "one" : "two" }`, buttonText: "New Game", message: "Winner!"});
                // showElement(overlay);
            } else if (board.filter(square => square.ownedBy === "none").length === 0) {
                body.innerHTML = bodyHTML({id: "finish", class: `screen screen-win screen-win-tie`, buttonText: "New Game", message: "Tie!"});
            }

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

        let board; 

        
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