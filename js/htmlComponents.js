/* jshint esversion: 6 */

// ================================================================================================
//   HTML Components Module
// ================================================================================================
const htmlComponents = function() {
    'use strict';
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
