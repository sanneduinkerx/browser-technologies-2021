//enhancement, dynamic changing shirt when user has clicked an input 
// source: https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/

// selecting elements from dom
const shirtSVG = document.getElementsByClassName('shirtColor');
const inputColor = document.querySelectorAll('input[name=color]');
const text = document.querySelector('input[type=text]');
const svg = document.querySelector('svg');

// for each input with name color an eventListener click that will then update 
inputColor.forEach(item => {
    item.addEventListener('click', updateColor);
})

// text.addEventListener('keyup', updateText);

//updating svg 
function updateColor(){
    // getting the value from the clicked input
    const color = this.value;
    console.log(color);
    console.log()
}

// function updateText(){
//     const text = this.value;
//     console.log(text);
// }

