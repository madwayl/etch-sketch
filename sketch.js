// Container Grid Calculation

const container = document.querySelector('.container');
let containerWidth, containerHeight;

let rangeSliderValue = document.querySelector('input[type="range"]').value;

// Status Monitoring
let singleColor = true, rainbow, grayScale, eraser, paint;


// Position Monitoring
let mouseX, mouseY, isMouseDown;
let subGridWidth, subGridHeight;

// Setting timeout for Window resize
let timeout = false;
let timeoutRange = false;

let arr;

// SECTION: Prime Functions 
// ANCHOR: Creating Divs
function createGridDivs(rangeSliderValue, container) {

    // REVIEW: Usage of `getComputedStyle` to get the necessary computed information than other methods
    containerWidth = (window.getComputedStyle(container).width).replace('px', '') - 3.5 * 2;
    containerHeight = (window.getComputedStyle(container).height).replace('px', '') - 3.5 * 2;

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    container.style.setProperty('grid', `repeat(${rangeSliderValue}, 1fr) / repeat(${rangeSliderValue}, 1fr)`)

    console.log(container)

    for (let i = 0; i < rangeSliderValue ** 2; i++) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id', i + 1);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);
        div.style.setProperty('background-color', 'rgba(200,200,200,0)')

        container.appendChild(div);
    }
}

// ANCHOR: Resizing Divs
function resizeResetDivs(event) {
    // console.log(event.target)
    let divs = container.children;
    containerWidth = (window.getComputedStyle(container).width).replace('px', '');
    containerHeight = (window.getComputedStyle(container).height).replace('px', '');
    // console.log(containerHeight, containerHeight)

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    container.style.setProperty('grid', `repeat(${rangeSliderValue},1fr) / repeat(${rangeSliderValue})`)

    // console.log(subGridHeight, subGridWidth)
    for (let div of divs) {
        div.style.width = `${subGridWidth}px`;
        div.style.height = `${subGridHeight}px`;
        if (event.target.value === "Clear Grid") {
            // console.log(div.style.backgroundColor);
            div.style.setProperty('background-color', 'rgba(200,200,200,0)');
        }
    }

    // Disable all and Enable Single Color Options, upon cleaning
    eraser = false;
    rainbow = false;
    grayScale = false;
    paint = false;
    singleColor = true;

    grayScaleButton.classList.remove('active');
    eraserButton.classList.remove('active');
    rainbowButton.classList.remove('active');
    paintButton.classList.remove('active');
}

// ANCHOR: ReArrange Divs on Slider
function reArrangeDivs() {
    // ✅ REVIEW: Using innerText to remove all inner elements
    container.innerText = '';

    containerWidth = (window.getComputedStyle(container).width).replace('px', '');
    containerHeight = (window.getComputedStyle(container).height).replace('px', '');

    // console.log(containerHeight, containerHeight)

    rangeSliderValue = document.querySelector('input[type="range"]').value;

    document.querySelector('#range-slider-input').textContent = `${rangeSliderValue} x ${rangeSliderValue}`

    subGridWidth = containerWidth / rangeSliderValue;
    subGridHeight = containerHeight / rangeSliderValue;

    container.style.setProperty('grid', `repeat(${rangeSliderValue}, 1fr) / repeat(${rangeSliderValue}, 1fr)`)

    // console.log(subGridHeight, subGridWidth);

    for (let i = 0; i < rangeSliderValue ** 2; i++) {
        div = document.createElement('div');
        div.classList.add('grid');
        div.setAttribute('id', i + 1);
        div.style.setProperty('width', `${subGridWidth}px`);
        div.style.setProperty('height', `${subGridHeight}px`);

        container.appendChild(div);
    }
}

// SECTION: Draw on Div + Note Color Changes on Button Click
// ANCHOR: Color Hover Change w.r.t. Status, for :
// 1. Rainbow Hover
// 2. GrayScale Hover
// 3. Eraser Hover
// 4. Paint Click

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

// ANCHOR: Color Paint :

function TopBottom(checkpointInit, arr, color) {
    // Top
    let check = checkpointInit - rangeSliderValue
    while (true) {
        if (check >= 1 && document.getElementById(check).style.backgroundColor == color && arr.indexOf(check) == -1) {
            arr.push(check)
            LeftRight(check, arr, color)
            continue;
        }
        check -= rangeSliderValue
        break;
    }
    // Below
    check = checkpointInit + Number(rangeSliderValue)
    while (true) {
        if (check <= rangeSliderValue ** 2 && document.getElementById(check).style.backgroundColor == color && arr.indexOf(check) == -1) {
            // console.log(document.getElementById(check))
            arr.push(check)
            LeftRight(check, arr, color)
            continue;
        }
        check += Number(rangeSliderValue)
        break;
    }

}

function LeftRight(checkpointInit, arr, color) {
    let check = checkpointInit - 1
    // Left
    while (true) {
        if ((check % rangeSliderValue) >= 1 && document.getElementById(check).style.backgroundColor == color && arr.indexOf(check) == -1) {
            arr.push(check)
            TopBottom(check, arr, color)
            check--
            continue;
        }
        // arr.push(check)
        break;
    }

    check = checkpointInit + 1
    // Right
    while (true) {
        if ((check % rangeSliderValue) > 0 && document.getElementById(check).style.backgroundColor == color && arr.indexOf(check) == -1) {
            arr.push(check)
            TopBottom(check, arr, color)
            check++
            continue;
        }
        if (check % rangeSliderValue == 0)
            arr.push(check)
        break;
    }
}

function colorPaint(e) {
    if (!paint) return

    console.log(e.target.id)
    arr = [Number(e.target.id)]
    let color = e.target.style.backgroundColor

    let check = Number(e.target.id)
    TopBottom(check, arr, color)
    LeftRight(check, arr, color)


    // arr.sort()
    // arr.sort()

    // console.log(arr[0], arr[arr.length - 1])

    arr.forEach(ind => document.getElementById(ind).style.backgroundColor = `${document.querySelector('input[id="color-picker-input"]').value}FF`)

}

// !SECTION
// !SECTION

// SECTION: FUNCTION CALLERS
// ANCHOR: START
// Compute Grids
document.addEventListener('DOMContentLoaded', createGridDivs(rangeSliderValue, container));

// ANCHOR: ON RESIZE & BUTTON CLICK & SLIDE CHANGE

// 1. Compute Grids on Resize of Window
window.addEventListener('resize', function (event) {
    // // ✅ REVIEW: Learnt about Timeout
    // clear the timeout
    clearTimeout(timeout);
    // start timing for event "completion"
    timeout = setTimeout(resizeResetDivs(event), 100);
});


// 2. RESET BUTTON CLICK
let ResetButton = document.querySelector('input[value="Clear Grid"]')
ResetButton.addEventListener('click', resizeResetDivs)

// 3. RANGE SLIDE CHANGE
// ✅ REVIEW: Adding more than 1 event as array with forEach
let RangeSlider = document.querySelector('input[type="range"]')
RangeSlider.addEventListener('input', function () {
    // clear the timeout
    clearTimeout(timeoutRange);
    // start timing for event "completion"
    timeoutRange = setTimeout(reArrangeDivs, 100);
    // reArrangeDivs()
});
// !SECTION


// SECTION: Change Color Generator on Button Click
// ANCHOR: Toggling Single Color
colorPickButton = document.querySelector('#cpicker');
colorPickButton.addEventListener('click', () => {
    if (!singleColor) {
        rainbow = false;
        grayScale = false;
        eraser = false;
        paint = false;
        singleColor = true;
    }

    grayScaleButton.classList.remove('active');
    eraserButton.classList.remove('active');
    rainbowButton.classList.remove('active');
    paintButton.classList.remove('active')

})


// ANCHOR: Toggling Rainbow
rainbowButton = document.querySelector('input[value="Rainbow Hover"]');
rainbowButton.addEventListener('click', () => {
    if (!rainbow) {
        rainbow = true;
        grayScale = false;
        eraser = false;
        singleColor = false;
        paint = false;
        grayScaleButton.classList.remove('active');
        eraserButton.classList.remove('active');
        paintButton.classList.remove('active');
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

    if (!grayScale) {
        grayScale = true;
        rainbow = false;
        eraser = false;
        singleColor = false;
        paint = false;
        rainbowButton.classList.remove('active');
        eraserButton.classList.remove('active');
        paintButton.classList.remove('active');

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

    if (!eraser) {
        grayScale = false;
        rainbow = false;
        eraser = true;
        singleColor = false;
        paint = false;
        grayScaleButton.classList.remove('active');
        rainbowButton.classList.remove('active');
        paintButton.classList.remove('active');
    } else {
        eraser = false;
        singleColor = true;
    }

    eraserButton.classList.toggle('active');

});

// ANCHOR: Toggling Paint
paintButton = document.querySelector('input[value="Paint"]')
paintButton.addEventListener('click', () => {
    if (!paint) {
        grayScale = false;
        rainbow = false;
        eraser = false;
        singleColor = false;
        paint = true;
        grayScaleButton.classList.remove('active');
        rainbowButton.classList.remove('active');
        eraserButton.classList.remove('active');
    } else {
        paint = false;
        singleColor = true;

    }

    paintButton.classList.toggle('active');

});
// !SECTION

// SECTION: Color Change
// ANCHOR: Change Color on Hover
container.addEventListener('mouseenter', () => {
    for (const child of container.children) {
        child.addEventListener('mouseover', colorHover, false);

        child.addEventListener('click', colorPaint, false);
    }
});

// !SECTION

// Check on Mouse Down Event to fill up 'isMouseDown'
document.body.addEventListener("mousedown", function () { isMouseDown = true; }, false);
document.body.addEventListener("mouseup", function () { isMouseDown = false; }, false);

