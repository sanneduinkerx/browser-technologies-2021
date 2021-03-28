//enhancement, dynamicly changing shirt when user has clicked an input 

// -> noted if 1 line doesnt work the whole js file doesnt work which means svg is display none which is what i want so no feature detection
//so automatically the svg is display none, and visible when js works -> in js i add a class to make it display block

// selecting elements from dom
const shirtSVG = document.getElementsByClassName('shirtColor');
const inputColor = document.querySelectorAll('input[name=color]');
const inputImg = document.querySelectorAll('input[name=fanBaseImg]');
const text = document.querySelector('input[type=text]');
const svg = document.getElementById('svgShirt');
const section = document.getElementById('svgShow');
const main = document.getElementsByClassName('formLayout');
const textShirt = document.createElement('p');
const imgElement = document.createElement('img');

// if js works, svg is shown to see live updates, otherwise user cant see svg just form -> core function
main[0].classList.add('show');
//creating an input field for the tshirt text
section.appendChild(textShirt);
section.appendChild(imgElement);

// eventlisteners
// for each input with name color an eventListener click that will then update 
// updating the fill of the svg 
// updating svg - doesnt work without css
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
inputImg.forEach(item => {
    item.addEventListener('click', function updateImg(){
        // getting the value from the clicked input
        const imgFanBase = this.value;

        //checks imgFanBase againt every case 
        switch (imgFanBase){
            case 'Marvel' :
                imgElement.src = '/img/marvelLogo.png';
                imgElement.alt = 'marvel logo';
                break;

            case 'HarryPotter' :
                imgElement.src = '/img/Harry-Potter-Logo.png';
                imgElement.alt = 'Harry Potter logo';
                break;
            
            case 'StarWars' :
                imgElement.src = '/img/StarWars-logo.png';
                imgElement.alt = 'Star Wars logo';
                break;
            
            case 'noImg' :
                imgElement.removeAttribute('src');
                imgElement.removeAttribute('alt');
                break;
        }
    });
})

// fallback when not working, if eventlistener is not supported, hide shirt