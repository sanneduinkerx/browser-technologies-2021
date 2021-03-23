// source: https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
const express = require('express');
const fs = require('fs');

const rawData = fs.readFileSync('public/data.json');
const data = JSON.parse(rawData);

// Create Express app
const app = express()
const PORT = process.env.PORT || 8081; 

app.use(express.static('public'))
// setting ejs as the view engine
app.set('view engine', 'ejs'); 

// A sample route
app.get('/', function(req, res){ 
    res.render('home');
}); 

app.get('/shirtMaker', function(req, res){ 
    res.render('shirtMaker');
});  

app.get('/gegevens', function(req, res){ 
    res.render('gegevens');

    //getting data from URL
    const dataObj = {
        color: `${req.query.color}`,
        text:  `${req.query.TshirtText}`,
        fanBaseImg: `${req.query.fanBaseImg}`,
        type: `${req.query.type}`,
        size: `${req.query.size}`
    }

    // stringify so its readable
    const data = JSON.stringify(dataObj, null, 2);
    //write to file data.json
    fs.writeFile('public/data.json', data, finished); 
    function finished(err){
        console.log('all set');
    }
}); 

app.get('/overzicht', function(req, res){
    console.log(data);
    res.render('overzicht', {
        color: data.color,
        text: data.text,
        fanBaseImg: data.fanBaseImg,
        type: data.type,
        size: data.size
    });

})


// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 