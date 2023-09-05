export default function greetingsDB(db) {
let counter = 0;
  // async function addName(name) {
  //   await db.none('INSERT INTO users (name, count) VALUES ($1, $2)', [name, 1]);
  // }

  async function getAllNames() {
    const results = await db.any('SELECT name FROM users');
    return results;
  }



  async function refreshDatabase() {
    await db.none('DELETE FROM users');
  }

  // async function updateCountForName(name) {
  //   await db.none('UPDATE users SET count = count + 1 WHERE name = $1', [name]);
  // }

  async function getCountForName(name) {
    const results = await db.oneOrNone('SELECT * FROM users WHERE name = $1', [name]);
    return results.count;
  }

  // async function doesNameExist(name) {
  //   const result = await db.oneOrNone('SELECT name FROM users WHERE name = $1', [name]);
  //   return result;
  // }

   async function increment(selectedName) {
    const name = await db.oneOrNone('SELECT * FROM users WHERE  name = $1', [selectedName])
    if (!name) {
        await db.none('INSERT INTO users (name, count) VALUES ($1, $2)', [selectedName, 1]);
        counter ++;
      return false
  }else{
    await db.none('UPDATE users SET count = count + 1 WHERE name = $1', [selectedName]);
  }
 return true;
   }

   async function getGreetCountForUser() {
    return counter;
   }



  return {
    //addName,
    getAllNames,
    increment,
    getGreetCountForUser,
    refreshDatabase,
   // updateCountForName,
    getCountForName,
    //doesNameExist,
   // incrementPeopleNamesCount

};
}
