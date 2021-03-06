/**
 * Created by kalyan on 12/5/17.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.use(express.static(__dirname + "/public"));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err){
            console.log("Unable to reach the server")
        }
    })
    next();
})

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
//     next();
// })

app.get('/', (req, res) => {
      //res.send("Hello Express");
      // res.send({
      //     name: "Suman",
      //     Likes: [
      //         'Gaming',
      //         'Travelling'
      //     ]
      // });
    res.render('home.hbs', {
        pageTitle: 'Home Test Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to the WebServer'

    })

    });

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorCode: '400',
        errorMessage: "Bad Request"
    });
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
