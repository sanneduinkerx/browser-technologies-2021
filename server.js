// source: https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {v4 : uuidv4} = require('uuid')

// Create Express app
const app = express()
const userId = uuidv4()
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
    const rawData = fs.readFileSync('public/data/design.json');
    const data = JSON.parse(rawData);

    res.render('overzicht', {
        color: data.userDesign.color,
        text: data.userDesign.text,
        fanBaseImg: data.userDesign.fanBaseImg,
    });
})

app.get('/shirtMaker', function(req, res){ 
    res.render('shirtMaker');
});  

// use app.post later, at least i know how it works, didnt have time to do more
app.post('/shirtMaker', function(req, res){
       //getting data from the posted form
       const dataObj = {
        userId,
        userDesign: {   
            color: `${req.body.color}`,
            text:  `${req.body.TshirtText}`,
            fanBaseImg: `${req.body.fanBaseImg}`
        }
    }

    // stringify so its readable
    const data = JSON.stringify(dataObj, null, 2);
    //write to file data.json
    fs.writeFile('public/data/design.json', data, finished); 
    function finished(err){
        console.log('all set');
        res.redirect('/bestel')
    }
}) 

app.get('/bestel', function(req, res){
    const rawData = fs.readFileSync('public/data/design.json');
    const data = JSON.parse(rawData);

    console.log(data);
    res.render('bestel', {
        color: data.userDesign.color,
        text: data.userDesign.text,
        fanBaseImg: data.userDesign.fanBaseImg,
    });
})

app.post('/bestel', function(req, res){
    const rawData = fs.readFileSync('public/data/design.json');
    const designData = JSON.parse(rawData);
    
    const dataObj = {
        userId: designData.userId, 
        userData: {
            type: `${req.body.type}`,
            size:  `${req.body.size}`,
            ammount: `${req.body.ammount}`,
            firstname: `${req.body.firstname}`,
            lastname: `${req.body.surname}`,
            email: `${req.body.userMail}`,
        }
    }

    // stringify so its readable
    const data = JSON.stringify(dataObj, null, 2);
    //write to file data.json
    fs.writeFile('public/data/userData.json', data, finished); 
    function finished(err){
        console.log('all set');
        // res.redirect(`/gegevens/${userId}`);
        res.redirect('/bevestiging')
    }
})

app.get('/bevestiging', function(req, res){
    res.render('bevestiging')
})

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 