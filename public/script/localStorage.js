// enhancement 2: localstorage, when refreshing form still filled in
// fallback if localstorage doesnt work...
// plus shirt has to change with it...............

// object detection
// this is a second option, first option was: typeof(Storage) !== "undefined" didnt work even though cookies was off it still went through
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

        //selecting elements from dom
        const formInput = document.querySelectorAll('input');
        //adding name and value of all inputs to localstorage
        formInput.forEach(item => {
            item.addEventListener('change', function addLS(){
                // getting the value from the clicked input
                const key = this.name;
                const value = this.value;
                localStorage.setItem(`${key}`, `${value}`);
            });
        })
        
         //getting form values from localstorage
        // when page reloads 
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

    console.log(localStorage)
} else{
    console.log('has cookies turned off')
}