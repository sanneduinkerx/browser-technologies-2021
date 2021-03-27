//enhancement, dynamic changing shirt when user has clicked an input 
// source: https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/

// dont forget feature detection, als JS uit is wat is de fallback -> dan niet shirt laten zien? of als eventlistener niet werkt
//so automatically visibilty hidden, and visible when js works with a class

// selecting elements from dom
const shirtSVG = document.getElementsByClassName('shirtColor');
const inputColor = document.querySelectorAll('input[name=color]');
const text = document.querySelector('input[type=text]');
const svg = document.getElementById('svgShirt');
const section = document.getElementById('svgShow');
const main = document.getElementsByClassName('formLayout');
const textShirt = document.createElement('p');

// if js works, svg is shown to see live updates, otherwise user cant see svg just form -> core function
main[0].classList.add('show');
//creating an input field for the tshirt text
section.appendChild(textShirt);

// eventlisteners
// for each input with name color an eventListener click that will then update 
// updating the fill of the svg 
//updating svg - doesnt work without css
inputColor.forEach(item => {
    item.addEventListener('click', function updateColor(){
         // getting the value from the clicked input
        const color = this.value;
        shirtSVG[0].style.fill = `${color}`;
    });
})

// updating text live on shirt within an p element
//this works without css
text.addEventListener('keyup', function updateText(){
    const text = this.value;
    textShirt.textContent = `${text}`;
    console.log(textShirt);
});

//updating img in shirt
//........

// fallback when not working, if eventlistener is not supported, hide shirt