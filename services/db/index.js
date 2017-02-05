import mysql from "mysql"
import promisify from "es6-promisify"
import fs from "fs-promise"
import path from "path"

let connection
let query
let dbName

import {
  User,
  Provider,
  Place,
  Category,
  SubCategory
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
  return users.map(toUser)
}

export const getUserByCredentials = async (email, password) => {
  let results = await query(
    "SELECT * FROM User WHERE email = ? AND password = ?",
    [email, password]
  )
  let userFromDb = results[0]
  console.log(userFromDb);
  if(userFromDb) {
    return toUser(userFromDb)
  }
  else {
    return null
  }
}

const toUser = (local) => new User({
  username: local.USERNAME,
  email: local.EMAIL,
  role: local.ROLE,
  title: local.TITLE,
  number: local.USERNUMBER
})

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

  let {PLACENUMBER, ...placeData} = place
  let data = parsePlace(placeData)
  return await query("UPDATE PLACE SET ? WHERE PLACENUMBER = ?", [
    data,
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

/* Categories */

export const getAllCategories = async () => {
  let categories = await query(`
    SELECT c.*, u.*, sc.*
    FROM CATEGORY c
      LEFT JOIN MANAGE AS m ON m.CATEGORYNUMBER = c.CATEGORYNUMBER
      LEFT JOIN USER AS u ON u.USERNUMBER = m.USERNUMBER
      LEFT JOIN SUBCATEGORY AS sc ON c.CATEGORYNUMBER = sc.CATEGORYNUMBER
  `)
  return toCategories(categories)
}

export const createCategory = async (category) => {
  let res = await query("INSERT INTO CATEGORY SET ?", parseCategory(category))
  let insertedCategory = new Category({
    ...category,
    number: res.insertId
  })
  await addCategoryManager(insertedCategory, category.managedBy)
  return insertedCategory
}

export const addCategoryManager = async (category, user) => {
  return await query("INSERT INTO MANAGE SET ?", {
    USERNUMBER: user.number,
    CATEGORYNUMBER: category.number
  })
}

export const updateCategory = async (category) => {
  let data = parseCategory(category)
  let {CATEGORYNUMBER, ...categoryData} = data
  await query("UPDATE CATEGORY SET ? WHERE CATEGORYNUMBER = ?", [
    categoryData,
    CATEGORYNUMBER
  ])
  return await query("UPDATE MANAGE SET ? WHERE CATEGORYNUMBER = ?", [{
      USERNUMBER: category.managedBy.number
    },
    CATEGORYNUMBER
  ])
}

export const getCategory = async (category) => {
  let results = await query(`
    SELECT c.*, u.*, sc.*
    FROM CATEGORY c
      LEFT JOIN MANAGE AS m ON m.CATEGORYNUMBER = c.CATEGORYNUMBER
      LEFT JOIN USER AS u ON u.USERNUMBER = m.USERNUMBER
      LEFT JOIN SUBCATEGORY AS sc ON c.CATEGORYNUMBER = sc.CATEGORYNUMBER
    WHERE c.CATEGORYNUMBER = ?
  `, [category.number])
  return toCategories(results)[0]
}

const toCategory = (local) => {
  let data = {
    number: local.CATEGORYNUMBER,
    name: local.CATEGORYNAME
  }
  return new Category(data)
}

const toCategories = (local) => {
  return local.reduce((rows, data) => {
    let category = toCategory(data)
    let managedBy = toUser(data)
    let subCategory = toSubCategory(data)
    let index = rows.findIndex(r => r.number == category.number)
    if(index == -1) {
      category.managedBy = managedBy
      category.subCategories = [subCategory]
      rows.push(category)
    }
    else {
      rows[index].subCategories.push(subCategory)
    }
    return rows
  }, [])
}

const parseCategory = (category) => {
  let local = {
    CATEGORYNAME: category.name,
    CATEGORYNUMBER: category.number
  }
  return local
}


/* SubCategories */

export const createSubCategory = async (subCategory) => {
  return await query("INSERT INTO SUBCATEGORY SET ?", parseSubCategory(subCategory))
}

export const updateSubCategory = async (subCategory) => {
  let data = parsePlace(placeData)
  let {PLACENUMBER, ...placeData} = data
  return await query("UPDATE CATEGORY SET ? WHERE PLACENUMBER = ?", [
    placeData,
    PLACENUMBER
  ])
}

export const getSubCategory = async (subCategory) => {
  let results = await query(`
    SELECT *
    FROM SUBCATEGORY c
    WHERE c.SUBCATEGORYNUMBER = ?
  `, [subCategory.number])
  let scFromDb = results[0]
  if(scFromDb) {
    let sc = toSubCategory(scFromDb)
    return sc
  }
  else {
    return null
  }
}

const toSubCategory = (local) => {
  let data = {
    number: local.SUBCATEGORYNUMBER,
    name: local.SUBCATEGORYNAME,
  }
  if(local.CATEGORYNUMBER) {
    data.category = {
      number: local.CATEGORYNUMBER
    }
  }
  return new SubCategory(data)
}

const parseSubCategory = (subCategory) => {
  let local = {
    SUBCATEGORYNUMBER: subCategory.number,
    SUBCATEGORYNAME: subCategory.name,
  }
  if(subCategory.category) {
    local.CATEGORYNUMBER = subCategory.category.number
  }
  return local
}

/* Providers */

export const createProvider = async (provider) => {
  return await query("INSERT INTO PROVIDER SET ?", parseProvider(provider))
}

export const updateProvider = async (provider) => {

  let {PROVIDERNUMBER, ...providerData} = parseProvider(provider)
  return await query("UPDATE PROVIDER SET ? WHERE PROVIDERNUMBER = ?", [
    providerData,
    PROVIDERNUMBER
  ])
}

export const getProvider = async (provider) => {
  let results = await query("SELECT * FROM PROVIDER WHERE PROVIDERNUMBER = ?", [provider.number])
  let placeFromDb = results[0]
  if(placeFromDb) {
    return toProvider(placeFromDb)
  }
  else {
    return null
  }
}

export const getAllProviders = async () => {
  let places = await query("SELECT * FROM PROVIDER")
  return places.map(toProvider)
}

const toProvider = (local) => new Provider({
  number: local.PROVIDERNUMBER,
  name: local.PROVIDERNAME,
  adress: local.PROVIDERADRESS,
  postCode: local.PROVIDERPOSTCODE,
  city: local.PROVIDERCITY,
  phoneNumber: local.PROVIDERPHONE,
  fax: local.PROVIDERFAX,
  email: local.PROVIDERMAIL,
})

const parseProvider = (provider) => ({
  PROVIDERNUMBER: provider.number ,
  PROVIDERNAME: provider.name ,
  PROVIDERADRESS: provider.adress ,
  PROVIDERPOSTCODE: provider.postCode ,
  PROVIDERCITY: provider.city ,
  PROVIDERPHONE: provider.phoneNumber ,
  PROVIDERFAX: provider.fax ,
  PROVIDERMAIL: provider.email ,
})
