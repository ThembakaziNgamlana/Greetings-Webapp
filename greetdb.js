export default function greetingsDB(db) {
  async function addName(name) {
    await db.none('INSERT INTO users (name, count) VALUES ($1, $2)', [name, 1]);
  }

  async function getAllNames() {
    const results = await db.any('SELECT name FROM users');
    return results;
  }

  async function getGreetCountForUsers() {
    const result = await db.any('SELECT * FROM users');
    return result.length;
  }

  async function refreshDatabase() {
    await db.none('DELETE FROM users');
  }

  async function updateCountForName(name) {
    await db.none('UPDATE users SET count = count + 1 WHERE name = $1', [name]);
  }

  async function getCountForName(name) {
    const results = await db.oneOrNone('SELECT * FROM users WHERE name = $1', [name]);
    return results.count;
  }

  async function doesNameExist(name) {
    const result = await db.oneOrNone('SELECT name FROM users WHERE name = $1', [name]);
    return result;
  }

   async function incrementPeopleNamesCount(selectedName) {
    const name = await db.oneOrNone('SELECT * FROM users WHERE  name = $1', [selectedName])
    if (!greetedNames[selectedName]) {
      greetedNames[selectedName] = 1;
      greetCount++;
      return false;
  }
  greetedNames[selectedName]++;
  return true;
   }





  return {
    addName,
    getAllNames,
    incrementPeopleNamesCount,
    getGreetCountForUsers,
    refreshDatabase,
    updateCountForName,
    getCountForName,
    doesNameExist,
   incrementPeopleNamesCount

};
}
