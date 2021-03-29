// enhancement 2: localstorage, when refreshing form still filled in

// object detection
// source: https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
function localStorageDetection(){
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

// if localstorage detection is true, from the test above it executes this otherwise it doesnt do anything
if(localStorageDetection() === true){
    console.log('localstorage on');

    ///////////////////////////
    //adding to localstorage//
    /////////////////////////

    //selecting elements from dom
    const formInput = document.querySelectorAll('input');

    //adding name and value of all inputs to localstorage, the moment user clicks on an input
    formInput.forEach(item => {
        item.addEventListener('change', function addLS(){

            // getting the value from the clicked input
            const key = this.name;
            const value = this.value;
            //putting the name and value of input and putting in localstorage
            localStorage.setItem(`${key}`, `${value}`);
        });
    })

     ///////////////////////////////////
    //getting items from localstorage//
    //////////////////////////////////

    // when user refreshes, form is still there//

    // when page reloads this activates, then gets all info from localstorage and puts it in form
    // first use window.onload, but not a lot of browsers supported that i saw on caniuse.com so switched to addEventlistener ('load')
    window.addEventListener('load', function getItems(){

        // get items wih key color from localstorage
        //ontwerp
        const color = localStorage.getItem("color");
        const text = localStorage.getItem("TshirtText");
        const img = localStorage.getItem("fanBaseImg");

        //bestel
        const type = localStorage.getItem("type");
        const size = localStorage.getItem("size");
        const ammount = localStorage.getItem("ammount");
        const firstName = localStorage.getItem("firstname");
        const lastName = localStorage.getItem("surname");
        const userMail = localStorage.getItem("userMail");
        
        // select the one with the value thats in the localstorage
        //ontwerp
        const colorChoice = document.querySelector(`input[value=${color}]`);
        const textChoice = document.querySelector(`input[name=TshirtText]`);
        const imgChoice = document.querySelector(`input[value=${img}]`);

        //bestel
        const typeChoice = document.querySelector(`input[value=${type}]`);
        const sizeChoice = document.querySelector(`input[value=${size}]`);
        const ammountChoice = document.querySelector(`input[name=ammount]`);
        const userName = document.querySelector(`input[name=firstname]`);
        const userlastName = document.querySelector(`input[name=surname]`);
        const userEmail = document.querySelector(`input[name=userMail]`);

        //if colorChoice is available and doesnt give error then do whats in there otherwise the other
        // had error first on bestelform cause couldnt find colorChoice of undefined

        if(colorChoice){
            //ontwerp
            // that input element is checked:
            colorChoice.checked=true;
            imgChoice.checked=true;
            textChoice.value = `${text}`;
        } else if(typeChoice) {
            //bestel
            typeChoice.checked=true;
            sizeChoice.checked=true;
            ammountChoice.value = `${ammount}`;
            userName.value = `${firstName}`;
            userlastName.value = `${lastName}`;
            userEmail.value = `${userMail}`;   
        }
    })

} else{
    //if browser doesnt support localstorage, nothing happens, 
    // user won't know that enhancement was there in the first place
    //can still do the core functionalities
    console.log('has cookies turned off');
}