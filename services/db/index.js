import mysql from "mysql"
import promisify from "es6-promisify"
import fs from "fs-promise"
import path from "path"

let connection
let query
let dbName

import {
  User,
  Place
} from "../../models"

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


/* USERS */

export const createUser = async (user) => {
  return await query("INSERT INTO USER SET ?", {
    USERNAME: user.username,
    EMAIL: user.email,
    PASSWORD: user.password,
    ROLE: 2,
    TITLE: user.title,
    USERNUMBER: user.number
  })
}

export const updateUser = async (user) => {
  let data = {
    EMAIL: user.email,
    ROLE: user.role,
    TITLE: user.title,
    USERNAME: user.username
  }
  if(user.password) {
    data.PASSWORD = user.password
  }
  return await query("UPDATE USER SET ? WHERE USERNUMBER = ?", [
    data,
    user.number
  ])
}

export const getUserByNumber = async (number) => {
  let results = await query("SELECT * FROM User WHERE USERNUMBER = ?", [number])
  let userFromDb = results[0]
  if(userFromDb) {
    return new User({
      username: userFromDb.USERNAME,
      email: userFromDb.EMAIL,
      role: userFromDb.ROLE,
      title: userFromDb.TITLE,
      number: userFromDb.USERNUMBER
    })
  }
  else {
    return null
  }
}

export const getAllUsers = async () => {
  let users = await query("SELECT * FROM User")
  return users.map(u => new User({
    username: u.USERNAME,
    email: u.EMAIL,
    role: u.ROLE,
    title: u.TITLE,
    number: u.USERNUMBER
  }))
}

export const getUserByCredentials = async (email, password) => {
  let results = await query(
    "SELECT * FROM User WHERE email = ? AND password = ?",
    [email, password]
  )
  let userFromDb = results[0]
  if(userFromDb) {
    return new User({
      username: userFromDb.USERNAME,
      email: userFromDb.EMAIL,
      role: userFromDb.ROLE,
      title: userFromDb.TITLE,
      number: userFromDb.USERNUMBER
    })
  }
  else {
    return null
  }
}

/* PRODUCTS */

export const createProduct = async (product, category, subCategory, provider, place) => {
  //let category = product.category
  let productToSave = {
    PRODUCTNUMBER: productNumber,
    CATEGORYNUMBER: category.number,
    PLACENUMBER: place.number

  }
  return await query("INSERT INTO PRODUCT SET ?", productToSave)
}

/* PLACES */

export const createPlace = async (place) => {
  return await query("INSERT INTO PLACE SET ?", parsePlace(place))
}

export const updatePlace = async (place) => {
  let data = parsePlace(placeData)
  let {PLACENUMBER, ...placeData} = data
  return await query("UPDATE PLACE SET ? WHERE PLACENUMBER = ?", [
    placeData,
    PLACENUMBER
  ])
}

export const getPlace = async (place) => {
  let results = await query("SELECT * FROM PLACE WHERE PLACENUMBER = ?", [place.number])
  let placeFromDb = results[0]
  if(placeFromDb) {
    return toPlace(placeFromDb)
  }
  else {
    return null
  }
}

export const getAllPlaces = async () => {
  let places = await query("SELECT * FROM PLACE")
  return places.map(toPlace)
}

const toPlace = (local) => new Place({
  number: local.PLACENUMBER,
  name: local.PLACENAME,
  placeFloor: local.PLACEFLOOR,
  placeType: local.PLACETYPE,
})

const parsePlace = (place) => ({
  PLACENUMBER: place.number,
  PLACENAME: place.name,
  PLACEFLOOR: place.placeFloor,
  PLACETYPE: place.placeType,
})
