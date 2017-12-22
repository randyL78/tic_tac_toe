/* jshint esversion: 6 */

// Wait until HTML loads to begin program
document.addEventListener('DOMContentLoaded', () => {
    'use strict'

    //=============================
    //  Globales
    //=============================
  

    //=============================
    //  Generic helper functions
    //=============================
    /**
     * Hide an element
     * @param {object} element  The element to hide
     */
    const hideElement = (element) => {
        element.classList.add("disappear");
     };
 
     /**
      * Show an element
      * @param {object} element  The element to show
      */
     const showElement = (element) => {
         element.classList.remove("hide");
      };


    // =============================
    //   Load Screen
    // =============================
 

    function createLoadScreen() {
        const loadScreen = document.createElement("div");
        loadScreen.className = "screen screen-start";
        loadScreen.setAttribute("id", "start");
        loadScreen.innerHTML = `
            <header>
                <h1>Tic Tac Toe</h1>
                <a href="#" class="button">Start game</a>
            </header>`;
        document.querySelector("body").appendChild(loadScreen);

        loadScreen.querySelector(".button").onclick = () => hideElement(loadScreen);
        return loadScreen;
    }
    createLoadScreen();
    


    // =============================
    //   Game Logic
    // =============================
    let playerIndex = 0;
    class Player{ 
        constructor(name, active) {
        this.name = (name) ? name : "Player" + playerIndex;
        this.active = active;
        }
    }

    function setPlayerTurn(player) {
        

    }



});