import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import createGreetingApp from './greetings.js';
import  greetings from  './greetdb.js';
import flash from 'express-flash';
import session from 'express-session';



let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}



const app = express();
const greet = createGreetingApp();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: false,
    layoutDir: "./views/layouts",
});


// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
// }));
// app.use(flash());




const pgp = pgPromise();
const db = pgp({
    connectionString: 'postgres://greetings_56o5_user:j33VLLfyHvKsIRPszuI2bhsZRb2OIyY9@dpg-cjhkunb6fquc73d5n9d0-a.oregon-postgres.render.com/greetings_56o5?ssl=true'

});



const greetInstance =  greetings(db);



app.use(express.static('public'));



app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {


 const validationMessage = greet.handleGreetBtnClick()
 

    res.render('index', {

    
    });
});


app.get('/greeted', async (req, res) => {
   
    const greetedNames = await greetInstance.showNames();
    res.render('greeted', {
         //count,
        greetedNames: greetedNames,
       
    });
});

app.get('/userCount/:userName', async (req, res) => {
    const userName = req.params.userName;
    const  greetCountForUser = await greetInstance.getAllNamesWithCounts(userName);
    const greetMessage =  `${userName} has been greeted ${greetCountForUser[0].count} times.`;
    res.send(greetMessage);
});

app.post('/reset', async (req, res) => {
  // await greetInstance.Message()

    await greetInstance.refresh();
     greet.reset()
    res.redirect('/');
});

app.post('/greetings', async (req, res) => {
    const name = req.body.name;
    const language = req.body.language;
   const greetingMessage =   greet.getGreetingMessage(language, name);

  
     const validationMessage =  greet.handleGreetBtnClick(name, language);
     if (!validationMessage) {
        const nameExists = await greetInstance.existingName(name);

        if (!nameExists) {
            await greetInstance.addNames(name);
        } else {
            await greetInstance.update(name);
        }
       
    }

   
    const message = greet.greetMessage();
    const count = await greetInstance.greetCountForUser();
console.log(validationMessage)
 
 

    res.render('index' ,{
        validationMessage,
        message,
        count,
    }
    )
});




const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
    console.log('App started at port', PORT);
});


























