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


app.post('/reset', (req, res) => {
    greet.resetPeopleNamesCount();
    res.redirect('/');
});

app.get('/', function (req, res) {
    res.render('index');
});

 app.get('/greetings', (req, res) => {
   res.render('greetings', { greetedCount: greet.getNameCount() });
 });



app.post('/greetings', (req, res) => {
    const name = req.body.name;
    const language = req.body.language; 
    
    const greetingMessage = greet.getGreetingMessage(language, name);

    if (name && language) {
        greet.incrementPeopleNamesCount(name);
    }
    
    res.render('index', {greetingMessage, greetedCount: greet.getNameCount()});
});



const PORT = process.env.PORT || 3011;


app.listen(PORT, () => {
    console.log('App started at port', PORT);
});


