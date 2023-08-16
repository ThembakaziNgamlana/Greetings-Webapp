import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import createGreetingApp from './greetings.js';

const app = express();
const greet = createGreetingApp();

const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: false,
    layoutDir: "./views/layouts",
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function (req, res) {
    res.render('index');
});

 app.get('/greetings', (req, res) => {
   res.render('index', { greetedCount: greet.getNameCount() });

 });

 app.get('/greetings', (req, res) => {
 res.render('greetings', {
       greetedCount: greet.getNameCount(),
      validationMessage: ''
    });
});



app.get('/greetAction', function (req, res) {
    res.render('greetAction', { greetedNames: greet.greetFunction() });
});

app.post('/reset', function (req, res) {
    greet.reset();
  
    res.render('index', {
      validationMessage: '', 
      greetedCount: 0,
      action: '' 
    });
  });


app.post('/greetings', (req, res) => {
    const name = req.body.name;
    const language = req.body.language; 

    const validationMessage = greet.handleGreetBtnClick(name, language); 

    const greetingMessage = greet.getGreetingMessage(language, name);
    
    if (validationMessage) { 
        res.render('index', {
            greetedCount: greet.getNameCount(),
            validationMessage,
            greetingMessage
        });
    } else {
        greet.incrementPeopleNamesCount(name);
        res.render('index', {
            greetingMessage,
            greetedCount: greet.getNameCount()
        });
    }

if (name && language) {
        greet.incrementPeopleNamesCount(name);
    }

    
    res.render('index', {greetingMessage, greetedCount: greet.getNameCount()});
});



const PORT = process.env.PORT || 3011;


app.listen(PORT, () => {
    console.log('App started at port', PORT);
});


