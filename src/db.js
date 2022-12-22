import sqlite3 from "sqlite3";

const path = "./token.db";
const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.info("Connected to the token database.");
});

export const initDB = () => {
  const sql = `CREATE TABLE IF NOT EXISTS token (id INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255) NOT NULL, token varchar(255) NOT NULL);`;
  db.run(sql)
}

export const stopDB = () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.info("Close the database connection.");
  });
}

export const writeNewTokenToDB = (username, token) => {
  const sql = `INSERT INTO token(username, token) VALUES(?, ?)`;

  db.run(sql, [username, token], function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.info(`A row has been inserted with rowid ${this.lastID}`);
  });
}

export const isUsernameExists = async (username) => {
  return !!getTokenByUsername(username)
}

export const getTokenByUsername = (username) => {
  const sql = `SELECT * FROM token WHERE username = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [username], (err, row) => {
      if (err) {
        return reject(err)
      }
      return resolve(row?.token)
    });
  })
}

