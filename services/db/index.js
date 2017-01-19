import mysql from "mysql"
import promisify from "es6-promisify"
import fs from "fs-promise"
import path from "path"

let connection
let query
let dbName

export const clearDatabase = async () => {
  await query("DROP database if exists ??;", [dbName])
  await query("CREATE database ??;", [dbName])
  await query("USE ??;", [dbName])
  let sqlFilePath = path.join(__dirname, "tables.sql")
  let sqlQuery = await fs.readFile(sqlFilePath, 'utf8')
  await query(sqlQuery)
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


export const createUser = async (data) => {
  return await query("INSERT INTO USER SET ?", data)
}

export const getUser = async (id) => {
  let results = await query("SELECT * FROM User WHERE USERNUMBER = ?", [id])
  return results[0]
}

export const getAllUsers = async () => {
  return await query("SELECT * FROM User")
}
