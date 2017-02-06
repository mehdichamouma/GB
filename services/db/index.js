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
  SubCategory,
  Product,
  Request
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
  let results = await query({
    nestTables: true,
    sql:`SELECT * FROM PROVIDER pro
      LEFT JOIN PRODUCT AS pr ON pro.PROVIDERNUMBER = pr.PROVIDERNUMBER
      WHERE pro.PROVIDERNUMBER = ?`,
    }, [provider.number])
  let providerFromDb = toProviders(results)[0]
  if(providerFromDb) {
    return providerFromDb
  }
  else {
    return null
  }
}

export const getAllProviders = async () => {
  let places = await query("SELECT * FROM PROVIDER")
  return places.map(toProvider)
}

const toProviders = (providers) => providers.reduce((rows, data) => {
  let provider = toProvider(data.pro)
  let product = toProduct(data.pr)
  let index = rows.findIndex(r => r.number == provider.number)
  if(index == -1) {
    provider.products = []
    rows.push(provider)
    index = rows.length - 1
  }
  if(product.number !== null) {
    rows[index].products.push(product)
  }
  return rows
}, [])
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

/* Products */

export const createProduct = async (product) => {
  return await query("INSERT INTO PRODUCT SET ?", parseProduct(product))
}

export const updateProduct = async (product) => {

  let {PRODUCTNUMBER, ...productData} = parseProduct(product)
  return await query("UPDATE PRODUCT SET ? WHERE PRODUCTNUMBER = ?", [
    productData,
    PRODUCTNUMBER
  ])
}

export const getProduct = async (product) => {
  let results = await query({
    sql: `SELECT * FROM PRODUCT pr
            LEFT JOIN CATEGORY AS ca ON pr.CATEGORYNUMBER = ca.CATEGORYNUMBER
            LEFT JOIN SUBCATEGORY AS sc ON pr.SUBCATEGORYNUMBER = sc.SUBCATEGORYNUMBER
            LEFT JOIN PROVIDER AS pro ON pr.PROVIDERNUMBER = pro.PROVIDERNUMBER
            LEFT JOIN PLACE AS pl ON pr.PLACENUMBER = pl.PLACENUMBER
            LEFT JOIN REQUEST AS re ON pr.PRODUCTNUMBER = re.PRODUCTNUMBER
            LEFT JOIN USER AS re_us ON re.USERNUMBER = re_us.USERNUMBER
          WHERE pr.PRODUCTNUMBER = ?`,
    nestTables: true
  }, [product.number])
  console.log(results);
  let productFromDb = toProducts(results)[0]
  if(productFromDb) {
    return productFromDb
  }
  else {
    return null
  }
}

export const getAllProducts = async (keyword = "") => {
  let products = await query({
    sql: `SELECT * FROM PRODUCT pr
              LEFT JOIN PLACE AS pl ON pl.PLACENUMBER = pr.PLACENUMBER
              LEFT JOIN CATEGORY AS ca ON ca.CATEGORYNUMBER = pr.CATEGORYNUMBER
              LEFT JOIN SUBCATEGORY AS sc ON sc.SUBCATEGORYNUMBER = pr.SUBCATEGORYNUMBER
              LEFT JOIN PROVIDER AS pro ON pro.PROVIDERNUMBER = pr.PROVIDERNUMBER
          WHERE pr.PRODUCTNAME LIKE ?`,
    nestTables: true
    }, `%${keyword}%`)
  return toProducts(products)
}

export const toProducts = (products) => products.reduce((rows, data) => {
  let product = toProduct(data.pr)
  let defaultPlace = toPlace(data.pl)
  let category = toCategory(data.ca)
  let subCategory = toSubCategory(data.sc)
  let provider = toProvider(data.pro)
  let request
  if(data.re && data.re.REQUESTNUMBER !== null) {
    request = toRequest(data.re)
    if(data.re_us) {
      request.requester = toUser(data.re_us)
    }

  }

  let index = rows.findIndex(r => r.number == product.number)
  if(index == -1) {
    product.provider = provider
    product.subCategory = subCategory
    product.category = category
    product.defaultPlace = defaultPlace
    product.requests = []
    rows.push(product)
    index = rows.length - 1
  }
  if(request) {
    rows[index].requests.push(request)
  }
  return rows
}, [])
const toProduct = (local) => {
  let data ={
    number: local.PRODUCTNUMBER,
    name: local.PRODUCTNAME,
    unit: local.PRODUCTUNIT,
    quantity: local.STOCKQUANTITY,
    thresholdQuantity: local.QUANTITYTHRESHOLD,
    price: local.PRODUCTPRICE,
  }
  if(local.CATEGORYNUMBER) {
     data.category = {
       number: local.CATEGORYNUMBER
     }
  }
  if(local.PROVIDERNUMBER) {
     data.provider = {
       number: local.PROVIDERNUMBER
     }
  }
  if(local.SUBCATEGORYNUMBER) {
     data.subCategory = {
       number: local.SUBCATEGORYNUMBER
     }
  }
  if(local.PLACENUMBER) {
     data.defaultPlace = {
       number: local.PLACENUMBER
     }
  }
  return new Product(data)
}

const parseProduct = (product) => {
  let local ={
    PRODUCTNUMBER: product.number,
    PRODUCTNAME: product.name ,
    PRODUCTUNIT: product.unit ,
    STOCKQUANTITY: product.quantity ,
    QUANTITYTHRESHOLD: product.thresholdQuantity ,
    PRODUCTPRICE: product.price ,
  }
  if(product.category) {
    local.CATEGORYNUMBER = product.category.number
  }
  if(product.provider) {
    local.PROVIDERNUMBER = product.provider.number
  }
  if(product.subCategory) {
    local.SUBCATEGORYNUMBER = product.subCategory.number
  }
  if(product.defaultPlace) {
    local.PLACENUMBER = product.defaultPlace.number
  }
  return local
}


/* REQUESTS */

export const createRequest = async (request) => {
  return await query("INSERT INTO REQUEST SET ?", parseRequest(request))
}

export const updateRequest = async (request) => {
  let {REQUESTNUMBER, ...requestData} = parseRequest(request)
  return await query("UPDATE REQUEST SET ? WHERE REQUESTNUMBER = ?", [
    requestData,
    REQUESTNUMBER
  ])
}

export const getRequest = async (request) => {
    let results = await query("SELECT * FROM REQUEST WHERE REQUESTNUMBER = ?", [request.number])
    let requestFromDb = results[0]
    if(requestFromDb) {
      return toProvider(requestFromDb)
    }
    else {
      return null
    }
}

export const getAllRequests = async () => {
  let results = await query(`
    SELECT * FROM REQUEST r
      LEFT JOIN USER AS u ON u.USERNUMBER = r.USERNUMBER
      LEFT JOIN PRODUCT AS p ON p.PRODUCTNUMBER = r.PRODUCTNUMBER
  `)
  return results.map(r => {
    let request = toRequest(r)
    request.requester = toUser(r)
    request.product = toProduct(r)
    return request
  })
}

const toRequest = (local) => {
  let data = {
    number: local.REQUESTNUMBER,
    requestDate: local.REQUESTDATE,
    quantity: local.REQUESTQUANTITY,
    status: local.REQUESTSTATUS,
  }
  if(local.USERNUMBER) {
     data.requester = {
       number: local.USERNUMBER
     }
  }
  if(local.PRODUCTNUMBER) {
     data.product = {
       number: local.PRODUCTNUMBER
     }
  }
  return new Request(data)
}

const parseRequest = (request) => {
  console.log(request);
  let local = {
    REQUESTNUMBER: request.number,
    REQUESTDATE: request.requestDate,
    REQUESTQUANTITY: request.quantity,
    REQUESTSTATUS: request.status
  }
  if(request.requester) {
    local.USERNUMBER = request.requester.number
  }
  if(request.product) {
    local.PRODUCTNUMBER = request.product.number
  }
  return local
}

/** ORDERS **/

export const createOrder = async (order) => {
  let {insertId} = await query("INSERT INTO ORDERS SET ?", parseOrder(order))
  order.number = insertId

  if(order.orderRows) {
    order.orderRows = order.orderRows.map(row => ({
      ...row,
      order: {
        number: insertId
      }
    }))
    await Promise.all(order.orderRows.map(addOrderRow))
  }
  return order
}

export const addOrderRow = async (orderRow) => {
  return await query("INSERT INTO CONTAIN SET ?", parseOrderRow(orderRow))
}

const parseOrder = (order) => {
  let local = {
    ORDERNUMBER: order.number,
    STATUS: order.status,
    DELIVERYDATE: order.deliveryDate,
    EFFDELIVERYDATE: order.effDeliveryDate,
  }
  if(order.orderCreator) {
    local.USERNUMBER = order.orderCreator.number
  }
  return local
}

const parseOrderRow = (orderRow) => {
  let local = {
    DLC: orderRow.dlc,
    QUANTITY: orderRow.quantity,
    EFFQUANTITY: orderRow.effectiveQuantity,
    UNITPRICE: orderRow.unitPrice,
  }
  if(orderRow.order) {
    local.ORDERNUMBER = orderRow.order.number
  }
  if(orderRow.product) {
    local.PRODUCTNUMBER = orderRow.product.number
  }
  return local
}

const toOrder = (local) => {
  let data = {
    number: local.ORDERNUMBER,
    status: local.STATUS,
    deliveryDate: local.DELIVERYDATE,
    effDeliveryDate: local.EFFDELIVERYDATE,
  }
  if(local.PRODUCTNUMBER) {
    data.product = {
      number: local.PRODUCTNUMBER
    }
  }
  return new Order(data)
}

const toOrderRow = (local) => {
  let data = {
    number: local.ORDERNUMBER,
    dlc: local.DLC,
    quantity: local.QUANTITY,
    effectiveQuantity: local.EFFQUANTITY,
    unitPrice: local.UNITPRICE,
  }
  if(local.ORDERNUMBER) {
    data.order = {
      number: local.ORDERNUMBER
    }
  }
  return new OrderRow(data)
}
