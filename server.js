// source: https://stackabuse.com/how-to-start-a-node-server-examples-with-the-most-popular-frameworks/
// app.js
const express = require('express')
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
});  

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`)) 