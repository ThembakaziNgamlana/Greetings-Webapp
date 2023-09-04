import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import createGreetingApp from './greetings.js';
import greetingsDB from './greetdb.js';

const app = express();
const greet = createGreetingApp();
const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: false,
  layoutDir: './views/layouts',
});

const pgp = pgPromise();
const db = pgp({
  connectionString: 'postgres://greetings_56o5_user:j33VLLfyHvKsIRPszuI2bhsZRb2OIyY9@dpg-cjhkunb6fquc73d5n9d0-a.oregon-postgres.render.com/greetings_56o5?ssl=true',
});

const greetInstance = greetingsDB(db);

app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const validationMessage = greet.handleGreetBtnClick();
  res.render('index', {});
});

app.get('/greeted', async (req, res) => {
  const greetedNames = await greetInstance.getAllNames();
  res.render('greeted', {
    greetedNames: greetedNames,
  });
});

app.get('/userCount/:userName', async (req, res) => {
  const userName = req.params.userName;
  const greetCountForUser = await greetInstance.getCountForName(userName);
  const greetMessage = `${userName} has been greeted ${greetCountForUser[0].count} times.`;
  res.send(greetMessage);
});

app.post('/reset', async (req, res) => {
  await greetInstance.refreshDatabase();
  greet.reset();
  res.redirect('/');
});

app.post('/greetings', async (req, res) => {
  const name = req.body.name;
  const language = req.body.language;
  const greetingMessage = greet.getGreetingMessage(language, name);
  const validationMessage = greet.handleGreetBtnClick(name, language);

  if (!validationMessage) {
    const nameExists = await greetInstance.doesNameExist(name);

    if (!nameExists) {
      await greetInstance.addName(name);
    } else {
      await greetInstance.updateCountForName(name);
    }
  }

  const message = greet.greetMessage();
  const count = await greetInstance. getGreetCountForUser();

  res.render('index', {
    validationMessage,
    message,
    count,
  });
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log('App started at port', PORT);
});























