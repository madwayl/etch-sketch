// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth = (window.getComputedStyle(container).width).replace('px','');
let containerHeight = (window.getComputedStyle(container).height).replace('px','');

let rangeSlider = document.querySelector('input[type="range"]');

let subGridWidth = containerWidth / rangeSlider.value;
let subGridHeight = containerHeight / rangeSlider.value;

function createElementGrid(rangeSlider,container) {

    for (let i = 0; i < rangeSlider**2; i++ ) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id',i);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);


        container.appendChild(div);
    }
}

function resizeDivs() {
    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    div.style.setProperty('width', `${subGridWidth}px`);
    div.style.setProperty('height', `${subGridHeight}px`);
}

document.addEventListener('DOMContentLoaded',createElementGrid(rangeSlider, container));