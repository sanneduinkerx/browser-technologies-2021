// source: https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const {v4 : uuidv4} = require('uuid')

// Create Express app
const app = express()
const userId = uuidv4()
const PORT = process.env.PORT || 8081; 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))
app.use(bodyParser.json())

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
app.post('/shirtMaker', urlencodedParser, [
    check('color', 'Je hebt nog geen kleur gekozen')
        .exists(),

    check('TshirtText', 'Vergeet niet een tekst op je shirt te zetten')
        .exists()
        .isLength({ min: 1 })

], function(req, res){

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('shirtMaker', {
                alert
            })
        } else {
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
        }  
}) 

app.get('/bestel', function(req, res){
    const rawData = fs.readFileSync('public/data/design.json');
    const data = JSON.parse(rawData);

    res.render('bestel', {
        color: data.userDesign.color,
        text: data.userDesign.text,
        fanBaseImg: data.userDesign.fanBaseImg,
    });
})

app.post('/bestel', urlencodedParser, [
    check('type', 'kies voor wie het t-shirt is')
        .exists(),

    check('size', 'Waho! Je bent nog vergeten een maat aan te geven')
    .exists(),

    check('ammount', 'Aho! Vergeet niet het aantal in te vullen')
        .exists()
        .isNumeric(),
    
    check('firstname', 'Waho! vergeet niet je voornaam in te voeren')
        .exists()
        .isLength({ min: 1, max: 50 }),
    
    check('surname', 'Waho! vergeet niet je achternaam in te voeren')
        .exists()
        .isLength({ min: 1, max: 50 }),

    check('userMail', 'Waho! Je bent vergeten een e-mail adres in te voeren')
        .exists()
        .isEmail({ min: 1, max: 50 }),

], function(req, res){
    const rawData = fs.readFileSync('public/data/design.json');
    const data = JSON.parse(rawData);
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            // return res.status(400).json({ errors: errors.array() });
            const alert = errors.array();
            res.render('bestel', {
                alert,
                color: data.userDesign.color,
                text: data.userDesign.text,
                fanBaseImg: data.userDesign.fanBaseImg,
            })
        } else{

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

        }
    
})

app.get('/bevestiging', function(req, res){
    res.render('bevestiging')
})

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 