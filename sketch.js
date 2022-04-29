// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth, containerHeight;

let rangeSlider = document.querySelector('input[type="range"]');
let subGridWidth, subGridHeight;

let inputColorChoice, inputColorText = "#2e353b";

let mouseX, mouseY;

// Setting timeout for Window resize
let timeout = false;
let timeoutRange = false;

// SECTION: Functions
// ANCHOR: Creating Divs
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

// ANCHOR: Resizing Divs
function resizeResetDivs(event) {
    // console.log(event.target.value)
    let divs = container.children;
    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');
    // console.log(containerHeight, containerHeight)

    subGridWidth = containerWidth / rangeSlider.value;
    subGridHeight = containerHeight / rangeSlider.value;

    // console.log(subGridHeight, subGridWidth)
    for (let div of divs ) {
        div.style.width = `${subGridWidth}px`;
        div.style.height =`${subGridHeight}px`;
        if(event.target.value === "Reset") {
            // console.log(div.style.backgroundColor);
            div.style.backgroundColor = 'transparent';
        }
    }
}

// ANCHOR: ReArrange Divs on Slider
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

// ANCHOR: Display Boxes on Radio Button Change
function displayBox(e) {
    inputColorChoice = e.target.value

    // console.log(inputColorChoice, e.target);

    if (inputColorChoice === "RGB Value") {
        document.querySelector('#cpicker-input').style.display = "block";
    } else if (inputColorChoice === "Color Mouse") {
        document.querySelector('#cpicker-input').style.display = "none";
    } else {}

}

// ANCHOR: Color Hover Change
function colorHover(e) {
    if (inputColorChoice === "RGB Value") {    
        inputColorText = document.querySelector('input[id="color-picker-input"]').value;
    } else if (inputColorChoice === "Color Mouse") {
        let random = Math.floor(Math.random() * 255)
        inputColorText = `rgb(${mouseX % 255}, ${mouseY % 255}, ${random % 255})`;
        
    } else { }
    // console.log(inputColorText, inputColorChoice, e.target)
    e.target.style.backgroundColor = inputColorText;
}

// SECTION: CALLERS
// ANCHOR: START
// Compute Grids
document.addEventListener('DOMContentLoaded',createGridDivs(rangeSlider.value, container));

// ANCHOR: ON RESIZE & BUTTON CLICK & SLIDE CHANGE
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

// ANCHOR: Radio Button Input Change
radioButtons = document.querySelectorAll('input[name="color_input"]');
for (let radio of radioButtons) { 
    radio.addEventListener('change', e => {
        displayBox(e);
        if (inputColorChoice === "Color Mouse") {
            document.onmousemove = e => {
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
        }
        // console.log(mouseX,mouseY);
    });
}

// ANCHOR: Change Color on Hover
container.addEventListener('mouseenter', (e) => {
    for (const child of e.target.children) {
        child.addEventListener('mouseover', colorHover);
    }
});


