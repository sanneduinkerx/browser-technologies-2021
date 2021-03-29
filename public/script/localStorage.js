// enhancement 2: localstorage, when refreshing form still filled in
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

if(localStorageDetection() === true){
    console.log('localstorage on')

    const colorChoice = document.querySelectorAll('input[name=color]');
    const imgChoice = document.querySelectorAll('input[name=fanBaseImg]');
    const textChoice = document.querySelector('input[type=text]');

    //adding form values to localstorage
    //when user clicks a color it gets added to localstorage
    colorChoice.forEach(item => {
        item.addEventListener('change', function addColor(){
             // getting the value from the clicked input
            const color = this.value;
            localStorage.setItem('color', `${color}`);
        });
    })

    imgChoice.forEach(item => {
        item.addEventListener('change', function addImg(){
             // getting the value from the clicked input
            const img = this.value;
            localStorage.setItem('img', `${img}`);
        });
    })

    textChoice.addEventListener('change', function addText(){
            const text = this.value;
            localStorage.setItem('text', `${text}`);
    })

    console.log(localStorage)

    //getting form values from localstorage

} else{
    console.log('has cookies turned off')
}