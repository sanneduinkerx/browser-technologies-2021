// source: https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {v4 : uuidv4} = require('uuid')

// const rawData = fs.readFileSync('public/data/data.json');

// Create Express app
const app = express()
const PORT = process.env.PORT || 8081; 

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// setting ejs as the view engine
app.set('view engine', 'ejs'); 

// A sample route
app.get('/', function(req, res){ 
    res.render('home');
}); 

app.get('/overzicht', function(req, res){
    res.render('overzicht')
})

app.get('/shirtMaker', function(req, res){ 
    res.render('shirtMaker');
});  

// use app.post later, at least i know how it works, didnt have time to do more
app.post('/shirtMaker', function(req, res){
        const userId = uuidv4()
       //getting data from the posted form
       const dataObj = {
        userId,
        color: `${req.body.color}`,
        text:  `${req.body.TshirtText}`,
        fanBaseImg: `${req.body.fanBaseImg}`
    }

    // stringify so its readable
    const data = JSON.stringify(dataObj, null, 2);
    //write to file data.json
    fs.writeFile('public/data/data.json', data, finished); 
    function finished(err){
        console.log('all set');
        // res.redirect(`/gegevens/${userId}`);
        res.redirect('/bestel')
    }
}) 

app.get('/bestel', function(req, res){
    const rawData = fs.readFileSync('public/data/data.json');
    const data = JSON.parse(rawData);

    console.log(data);
    res.render('bestel', {
        color: data.color,
        text: data.text,
        fanBaseImg: data.fanBaseImg,
        type: data.type,
        size: data.size
    });
})

// app.post('/bestel', function(req, res){
//     const dataObj = {
//         color: `${req.body.color}`,
//         text:  `${req.body.TshirtText}`,
//         fanBaseImg: `${req.body.fanBaseImg}`
//     }

//     // stringify so its readable
//     const data = JSON.stringify(dataObj, null, 2);
//     //write to file data.json
//     fs.writeFile('public/data/data.json', data, finished); 
//     function finished(err){
//         console.log('all set');
//         // res.redirect(`/gegevens/${userId}`);
//         res.redirect('/bevestiging')
//     }
// })

app.get('/bevestiging', function(req, res){
    res.render('bevestiging')
})

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 