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

// if localstorage detection is true, from the test above it executes this otherwise it doesnt do anything
if(localStorageDetection() === true){
    console.log('localstorage on');
    localStorage.clear;

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

    console.log(localStorage)

    //getting form values from localstorage

} else{
    console.log('has cookies turned off')
}