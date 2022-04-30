// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth, containerHeight;

let rangeSliderValue = document.querySelector('input[type="range"]').value;

// Status Monitoring
let singleColor = true, rainbow, grayScale, eraser;


// Position Monitoring
let mouseX, mouseY, isMouseDown;
let subGridWidth, subGridHeight;

// Setting timeout for Window resize
let timeout = false;
let timeoutRange = false;

// SECTION: Functions 
// ANCHOR: Creating Divs
function createGridDivs(rangeSliderValue,container) {

    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    for (let i = 0; i < rangeSliderValue**2; i++ ) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id',i);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);
        div.style.setProperty('background-color','rgba(200,200,200,0)')

        container.appendChild(div);
    }
}

// ANCHOR: Resizing Divs
function resizeResetDivs(event) {
    // console.log(event.target)
    let divs = container.children;
    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');
    // console.log(containerHeight, containerHeight)

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    // console.log(subGridHeight, subGridWidth)
    for (let div of divs ) {
        div.style.width = `${subGridWidth}px`;
        div.style.height =`${subGridHeight}px`;
        if(event.target.value === "Clear Grid") {
            // console.log(div.style.backgroundColor);
            div.style.setProperty('background-color','rgba(200,200,200,0)');
        }
    }

    // Disable all and Enable Single Color Options, upon cleaning
    eraser = false;
    rainbow = false;
    grayScale = false;
    singleColor = true;

    grayScaleButton.classList.remove('active');
    eraserButton.classList.remove('active');
    rainbowButton.classList.remove('active');
}

// ANCHOR: ReArrange Divs on Slider
function reArrangeDivs() {
    // ✅ REVIEW: Using innerText to remove all inner elements
    container.innerText = '';

    containerWidth = (window.getComputedStyle(container).width).replace('px','');
    containerHeight = (window.getComputedStyle(container).height).replace('px','');
    
    // console.log(containerHeight, containerHeight)

    rangeSliderValue = document.querySelector('input[type="range"]').value;

    document.querySelector('#range-slider-input').textContent = `${rangeSliderValue} x ${rangeSliderValue}`

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    // console.log(subGridHeight, subGridWidth);

    for (let i = 0; i < rangeSliderValue**2; i++ ) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id',i);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);

        container.appendChild(div);
    }
}

// ANCHOR: Color Hover Change w.r.t. Status, for :
// 1. Rainbow Hover
// 2. GrayScale Hover
// 3. Eraser Hover

function colorHover(e) {


    // ✅ REVIEW: Adding another event together by Boolean values
    // 1st Event : 'MouseOver'
    // 2nd Event : function allows only if 'MouseDown'
    if (!isMouseDown) return;
    
    if (singleColor) {
        e.target.style.backgroundColor = `${document.querySelector('input[id="color-picker-input"]').value}FF`;
    }

    if (rainbow) {
        let random = Math.floor(Math.random() * 255)
        e.target.style.backgroundColor = `rgb(${mouseX % 255}, ${mouseY % 255}, ${random % 255}, 1)`;
    } 

    if (grayScale) {

        // debugger;
        // ✅ REVIEW: Always use rgba() everywhere - include transparency
        let colorValue = e.target.style.backgroundColor.split(/[rgb(,)]/);
        // console.log(e.target.style.backgroundColor)
        // console.log(Boolean(colorValue[7]))
        let color = parseInt(colorValue[5]) - 51;
        let transparent = (colorValue[7] ? parseFloat(colorValue[7]) : 1) + 0.250;

        if (color <= 0) color = 0;
        if (transparent > 1) transparent = 1;

        // console.log(`Updated Value : rgb(${color},${color},${color},${transparent})`)
        e.target.style.backgroundColor = `rgb(${color},${color},${color},${transparent})`;

    }

    if (eraser) {
        e.target.style.backgroundColor = 'rgba(200,200,200,0)'
    }
}

// SECTION: CALLERS
// ANCHOR: START
// Compute Grids
document.addEventListener('DOMContentLoaded',createGridDivs(rangeSliderValue, container));

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
let ResetButton = document.querySelector('input[value="Clear Grid"]')
ResetButton.addEventListener('click',resizeResetDivs)

// 3. RANGE SLIDE CHANGE
// ✅ REVIEW: Adding more than 1 event as array with forEach
let RangeSlider = document.querySelector('input[type="range"]')
RangeSlider.addEventListener('input', function() {
    // clear the timeout
    clearTimeout(timeoutRange);
    // start timing for event "completion"
    timeoutRange = setTimeout(reArrangeDivs, 0);
});


// SECTION: Random Button Color Generator
// ANCHOR: Toggling Single Color
colorPickButton = document.querySelector('#cpicker');
colorPickButton.addEventListener('click', () => {
    if (!singleColor) {
        rainbow = false;
        grayScale = false;
        eraser = false;
        singleColor = true;
    }

    grayScaleButton.classList.remove('active');
    eraserButton.classList.remove('active');
    rainbowButton.classList.remove('active');


})


// ANCHOR: Toggling Rainbow
rainbowButton = document.querySelector('input[value="Rainbow Hover"]');
rainbowButton.addEventListener('click', () => {
    if (!rainbow) {
        rainbow = true;
        grayScale = false;
        eraser = false;
        singleColor = false;
        grayScaleButton.classList.remove('active');
        eraserButton.classList.remove('active');
    } else {
        rainbow = false;
        singleColor = true;
    }
    
    rainbowButton.classList.toggle('active');
    

    if (rainbow) {
        document.onmousemove = e => {
            mouseX = e.pageX;
            mouseY = e.pageY;
        }
    }
    // console.log(mouseX,mouseY);
    // console.log(rainbow)
});

// ANCHOR: Toggling GrayScale
grayScaleButton = document.querySelector('input[value="GrayScale Hover"]')
grayScaleButton.addEventListener('click', () => {

    if(!grayScale) {
        grayScale = true;
        rainbow = false;
        eraser = false;
        singleColor = false;
        rainbowButton.classList.remove('active');
        eraserButton.classList.remove('active');
    } else {
        grayScale = false;
        singleColor = true;
    }
    // console.log(grayScale)
    grayScaleButton.classList.toggle('active');
    
});

// ANCHOR: Toggling Eraser
eraserButton = document.querySelector('input[value="Eraser"]')
eraserButton.addEventListener('click', () => {

    if(!eraser) {
        grayScale = false;
        rainbow = false;
        eraser = true;
        singleColor = false;
        grayScaleButton.classList.remove('active');
        rainbowButton.classList.remove('active');
    } else {
        eraser = false;
        singleColor = true;
    }
    
    eraserButton.classList.toggle('active');

});


// SECTION: Color Change
// ANCHOR: Change Color on Hover
container.addEventListener('mouseenter', () => {
    for (const child of container.children) {
        child.addEventListener('mouseover', colorHover, false);
    }
});

// Check on Mouse Down Event to fill up 'isMouseDown'
document.body.addEventListener("mousedown", function() {isMouseDown = true;}, false);
document.body.addEventListener("mouseup", function() {isMouseDown = false;}, false);

