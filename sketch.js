// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth, containerHeight;

let rangeSlider = document.querySelector('input[type="range"]');
let subGridWidth, subGridHeight;

// Setting timeout for Window resize
let timeout = false;
let timeoutRange = false;

function createGridDivs(rangeSliderValue,container) {

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
    // console.log(containerHeight, containerHeight)

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    console.log(subGridHeight, subGridWidth)
    for (let div of divs ) {
        div.style.width = `${subGridWidth}px`;
        div.style.height =`${subGridHeight}px`;
        if(event.target.value === "Reset") {
            div.style['background-color'] = 'none';
        }
    }
}

function reArrangeDivs() {
    // ✅ REVIEW: Using innerText to remove all inner elements
    container.innerText = '';

    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');
    // console.log(containerHeight, containerHeight)

    rangeSliderValue = rangeSlider.value;

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    console.log(subGridHeight, subGridWidth);

    for (let i = 0; i < rangeSliderValue**2; i++ ) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id',i);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);

        container.appendChild(div);
    }
}

function displayBox(e) {
    inputColorChoice = e.target.value

    if (inputColorChoice === "Color Name") { 
        document.querySelector('#ctext-input').style.display = "block";
        document.querySelector('#rgb-input').style.display = "none";
    } else if (inputColorChoice === "RGB Value") {
        document.querySelector('#rgb-input').style.display = "block";
        document.querySelector('#ctext-input').style.display = "none";
    } else {
        document.querySelector('#rgb-input').style.display = "none";
        document.querySelector('#ctext-input').style.display = "none";
    }
}

function colorHover(e) {
    // ✅ REVIEW: How to use 
    // inputColorChoice = document.querySelector('input[name="color_input"]:checked').value;
    
    // if (inputColorChoice === "Color Name") {    
    //     inputColorText = document.querySelector('input[id="color-input"]');
    // } else if (inputColorChoice === "RGB Value") {
    //     r = document.querySelector('input[id="r-input"]');
    //     g = document.querySelector('input[id="g-input"]');
    //     b = document.querySelector('input[id="b-input"]');
    //     inputColorText = `rgb(${r}, ${g}, ${b})`
    // } else if (inputColorChoice === "Mouse Color") {
    //     debugger;
    //     inputColorText = `rgb(${e.OffsetX}, ${e.OffsetX}, ${e.OffsetX+e.OffsetY})`;
    // } else { }
    // console.log(e.target)
    e.target.style.backgroundColor = "rgb(46, 53, 59)";
}

// SECTION: START
// Compute Grids
document.addEventListener('DOMContentLoaded',createGridDivs(rangeSlider.value, container));

// SECTION: ON RESIZE & BUTTON CLICK & SLIDE CHANGE
// // ✅ REVIEW: Learnt about Timeout
// 1. Compute Grids on Resize of Window
window.addEventListener('resize',function(event) {
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(resizeResetDivs(event), 100);
});


// 2. RESET BUTTON CLICK
let ResetButton = document.querySelector('input[type="button"]')
ResetButton.addEventListener('click',resizeResetDivs)

// 3. RANGE SLIDE CHANGE
// ✅ REVIEW: Adding more than 1 event as array with forEach
let RangeSlider = document.querySelector('input[type="range"]')
RangeSlider.addEventListener('input',function() {
    // clear the timeout
    clearTimeout(timeoutRange);
    // start timing for event "completion"
    timeoutRange = setTimeout(reArrangeDivs, 80);
})

radioButtons = document.querySelectorAll('input[name="color_input"]');
for (let radio of radioButtons) { 
    addEventListener('change', displayBox)
}

// SECTION: Change Color on Hover
container.addEventListener('mouseenter', (e) => {
    for (const child of e.target.children) {
        child.addEventListener('mouseover', colorHover)
    }
});