const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
var compression = require('compression')
const {v4 : uuidv4} = require('uuid')

// Create Express app
const app = express()
const userId = uuidv4()
const PORT = process.env.PORT || 8081; 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'))
app.use(bodyParser.json())
//compress responses
app.use(compression())

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
    check('color', 'Kies een kleur')
        .exists(),

    check('TshirtText', 'Zet een eigen tekst op je t-shirt')
        .exists()
        .isLength({ min: 1 })

], function(req, res){

        const errors = validationResult(req);
        if(!errors.isEmpty()){
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

    check('size', 'Selecteer een maat')
    .exists(),

    check('ammount', 'Geef een aantal aan')
        .exists()
        .isNumeric(),
    
    check('firstname', 'Voer je voornaam in')
        .exists()
        .isLength({ min: 1, max: 50 }),
    
    check('surname', 'Voer je achternaam in')
        .exists()
        .isLength({ min: 1, max: 50 }),

    check('userMail', 'Voer een geldig e-mail adres in')
        .exists()
        .isEmail({ min: 1, max: 50 }),

], function(req, res){
    const rawData = fs.readFileSync('public/data/design.json');
    const data = JSON.parse(rawData);
    const userId = data.userId;

    const errors = validationResult(req);
        if(!errors.isEmpty()){
           
            const alert = errors.array();
            res.render('bestel', {
                alert,
                color: data.userDesign.color,
                text: data.userDesign.text,
                fanBaseImg: data.userDesign.fanBaseImg,
            })
        } else{
            const dataObj = {
                userId,
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
        
                res.redirect('/bevestiging')
            }

        }
    
})

app.get('/bevestiging', function(req, res){
    res.render('bevestiging')
})

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 