// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth, containerHeight;

let rangeSlider = document.querySelector('input[type="range"]');
let subGridWidth, subGridHeight;

// Setting timeout for Window resize
let timeout = false;

function createElementGrid(rangeSliderValue,container) {

    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    for (let i = 0; i < rangeSliderValue**2; i++ ) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id',i);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);

        container.appendChild(div);
    }
}

function resizeResetDivs(event) {
    let divs = container.children;
    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');
    console.log(containerHeight, containerHeight)

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    console.log(subGridHeight, subGridWidth)
    for (let div of divs ) {
        div.style.width = `${subGridWidth}px`;
        div.style.height =`${subGridHeight}px`;
        if(event.target.value === "Reset") {
            div.style['background-color'] = 'white';
        }
    }
}

// Compute Grids
document.addEventListener('DOMContentLoaded',createElementGrid(rangeSlider.value, container));

// Compute Grids on Resize of Window
window.addEventListener('resize',function(event) {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(resizeResetDivs(event), 100);
});

let ResetButton = document.querySelector('input[type="button"]')

ResetButton.addEventListener('click',resizeResetDivs)

