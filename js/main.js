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
        const boxes = document.querySelector(".boxes");


        boxes.onclick = (e) => {
            board.forEach( (square) => {
                if (e.target === square.element) {
                   if (square.ownedBy === "none") square.ownedBy = "1";                  
                }
            });
        }

        boxes.onmouseover = (e) => {
            if (e.target.classList.contains("box") ) {
                e.target.classList.add("box-filled-1");
            };
        };

        boxes.onmouseout = (e) => {
            board.forEach( (square) => {
                if (e.target === square.element) {
                   if (square.ownedBy === "none") e.target.classList.remove("box-filled-1");                
                }
            });
        };

        const getBoxLoc = (hitBox) => {
            // boxArray.forEach( (box, index) => {
            //     if (hitBox === box) {
            //         const row = Math.floor(index / 3);
            //         const col = index % 3;
            //         return {row: row, col: col};
            //     }
            // });
            return false;        
        }

        // =============================
        //   Players
        // =============================

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

        // const buildColumn = (row) => {
        //     let tempArray = [];
        //     for (let j = 0; j < 3; j++) {
        //         tempArray.push(new Square([row, j]));
        //     }  
        //     return tempArray;
        // }
        const board = buildBoard();


        // =============================
        //   AI
        // =============================


    });
}();