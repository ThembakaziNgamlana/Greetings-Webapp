export default function Greetdb(db) {

  async function addNames(name) {
    await db.none('INSERT INTO users (name, count) VALUES ($1, $2)', [name, 1]);
  }

  async function showNames(name) {
    var results = await db.any('SELECT name FROM users');
   return results;
  }

  async function greetCountForUser() {
    var result= await db.one('SELECT count(name) FROM users');
    //console.log(result)
    return result.count;
  }

   async function refresh() {
     await db.none('DELETE From users');
  };




  async function update(name) {
    await db.none('UPDATE users SET count = count + 1 WHERE name = $1', [name]);
  }

  async function getAllNamesWithCounts(name) {
    let results = await db.any('SELECT count FROM users WHERE name = $1', [name]);
   // console.log(results);
    return results;
  }

  async function existingName(name) {
    let results = await db.oneOrNone('SELECT name FROM users WHERE name = $1', [name]);
    return results;

  }

  return {
    addNames,
    showNames,
    greetCountForUser,
    update,
    refresh,
    getAllNamesWithCounts,
    existingName,
  };
}


