// enhancement 2: localstorage, when refreshing form still filled in
// fallback if localstorage doesnt work...

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
             // get item wih key color from localstorage
             const color = localStorage.getItem("color");
             const text = localStorage.getItem("TshirtText");
             const img = localStorage.getItem("fanBaseImg");
             // select the one with the value thats in the localstorage
             const colorChoice = document.querySelector(`input[value=${color}]`);
             const textChoice = document.querySelector(`input[name=TshirtText]`);
             const imgChoice = document.querySelector(`input[value=${img}]`);
             // that input element is checked:
             colorChoice.checked=true;
             imgChoice.checked=true;
             textChoice.value = `${text}`;

        })

    console.log(localStorage)


} else{
    console.log('has cookies turned off')
}