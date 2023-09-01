import { strict as assert } from 'assert';
import pgPromise from 'pg-promise';
import Greetdb from './greetdb.js'; 

const pgp = pgPromise();

const connectionString = 'postgres://greetings_56o5_user:j33VLLfyHvKsIRPszuI2bhsZRb2OIyY9@dpg-cjhkunb6fquc73d5n9d0-a.oregon-postgres.render.com/greetings_56o5?ssl=true';
const db = pgp(connectionString);

const greetDb = Greetdb(db);

describe('Greetdb functions', function() {
  this.slow(3000); 
  this.timeout(5000); // Set a timeout for the entire test suite

  beforeEach(async function() {
    // Clean the tables before each test run
    await db.none("delete from users;");
  });

  it('adds a name to the database', async function() {
    await greetDb.addNames('Themby');
    const result = await greetDb.showNames();
    assert.deepStrictEqual(result, [{ name: 'Themby' }]);
  });

  it('updates the count for a name', async function() {
    await greetDb.addNames('Akhona');
    await greetDb.update('Akhona');
    const result = await greetDb.getAllNamesWithCounts('Akhona');
    assert.strictEqual(result[0].count, 2); 
  });

  it('should retrieve names', async () => {
    await greetDb.addNames('David');
    const result = await greetDb.showNames();
    assert.deepStrictEqual(result, [{ name: 'David' }]);
  });



  it('should add a name and return the count', async () => {
    await greetDb.addNames('John');
    const count = await greetDb.greetCountForUser();
    assert.strictEqual(parseInt(count), 1);
  });
  it('should return an empty list of names when no names have been added', async () => {
    const names = await greetDb.showNames();
    assert.deepStrictEqual(names, []);
  });

 
  after(function() {
    db.$pool.end();
  });
});
