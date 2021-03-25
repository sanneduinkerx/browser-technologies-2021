//enhancement, dynamic changing shirt when user has clicked an input 
// source: https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/

// ADD FEATURE DETECTION FIRST SEE IF IT WORKS THEN EXECUTE IT

// selecting elements from dom
const shirtSVG = document.getElementsByClassName('shirtColor');
const inputColor = document.querySelectorAll('input[name=color]');
const text = document.querySelector('input[type=text]');
const svg = document.getElementById('svgShirt');
const section = document.querySelector('section:first-of-type')

//creating an input field for the tshirt text
const textShirt = document.createElement('p');
section.appendChild(textShirt);

// eventlisteners

// for each input with name color an eventListener click that will then update 
inputColor.forEach(item => {
    item.addEventListener('click', updateColor);
})

text.addEventListener('keyup', updateText);

//updating svg - doesnt work without css
function updateColor(){
    // getting the value from the clicked input
    const color = this.value;
    shirtSVG[0].style.fill = `${color}`;
}

//this works without css
function updateText(){
    const text = this.value;
    textShirt.textContent = `${text}`;
    console.log(textShirt);
}

