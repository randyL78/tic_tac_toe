/* jshint esversion: 6 */

// ================================================================================================
//  element module for showing and hiding elements
// ================================================================================================
const element = function() {    
    'use strict';
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
