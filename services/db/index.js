import mysql from "mysql"
import promisify from "es6-promisify"
import fs from "fs-promise"
import path from "path"

let connection
let query
let dbName

export const clearDatabase = () => {
  return query("DROP database if exists ??;", [dbName])
  .then(() => query("CREATE database ??;", [dbName]))
  .then(() => query("USE ??;", [dbName]))
  .then(() => {
    let sqlFilePath = path.join(__dirname, "tables.sql")
    return fs.readFile(sqlFilePath, 'utf8')
  })
  .then(sqlQuery => query(sqlQuery))
}

export const initDatabase = (dbInfos, _dbName) => {
  dbName = _dbName
  connection = mysql.createConnection(dbInfos);

  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if(err) {
        reject(err)
      }
      else {
        query = promisify(connection.query, connection)
        query("USE ??;", [dbName]).then(() => {
          resolve()
        })
      }
    });
  })
}


export const createUser = (data) => {
  return query("INSERT INTO USER SET ?", data)
  .then(() => {

  })
}

export const getUser = async (id) => {
  let results = await query("SELECT * FROM User WHERE USERNUMBER = ?", [id])
  return results[0]
}

export const getAllUsers = () => {
  return query("SELECT * FROM User")
}
