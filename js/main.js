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
            currentBox(e.target);
            board.forEach( (square) => {
                if (e.target === square.element) {
                   if (square.ownedBy === "none") {
                       square.ownedBy = playerTurn;
                       showTurn();
                    }
                }
            });
        }
        // Add the player's symbol when mouse hovers over square
        boxes.onmouseover = (e) => {
            board.forEach( (square) => {
                if (e.target === square.element) {
                   if (square.ownedBy === "none") e.target.classList.add(`box-filled-${playerTurn}`);                
                }
            });
        };

        // Remove player's symbol when mouse leaves square
        boxes.onmouseout = (e) => {
            board.forEach( (square) => {
                if (e.target === square.element) {
                   if (square.ownedBy === "none") e.target.classList.remove(`box-filled-${playerTurn}`);                
                }
            });
        };

        const checkOwnership = (currentBox) => {
            board.forEach( (square) => {
                if (currentBox === square.element) {
                    console.log("You found me!");
                }
            }
        }

        // Show whose turn it is in header
        const showTurn = () => {
            document.getElementById(`player${playerTurn}`).classList.remove("active");
            (playerTurn === 1) ? playerTurn = 2 : playerTurn = 1;
            document.getElementById(`player${playerTurn}`).classList.add("active");
        }

        // =============================
        //   Players
        // =============================
        let playerTurn = 2; 
        showTurn();

        // =============================
        //   Board
        // ============================= 
        function Square(location, ownedBy = "none") {
            this.location = location;
            this.ownedBy = ownedBy;
            this.element = boxes.querySelectorAll(".box")[(this.location.row * 3) + this.location.column ];
        }



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


    });
}();