import urlJoin from "url-join"
import config from "../config"
import io from "socket.io-client"
import querystring from "querystring"

/**
 * AWIMARKET API CLIENT
 * helpers to fetch data from the AWIMARKET API
 */


//promises
//

const BASE_URI = config.API_BASE_URL
let token

export const setToken = (t) => token = t



const request = (endpoint, ...params) => {
  let url = urlJoin(BASE_URI, "api", endpoint)
  let requestHeaders = {}
  let [userOptions = {}, ...otherParams] = params
  let {headers = {}, ...otherOptions} = userOptions
  if(token) {
    requestHeaders["Authorization"] = token
  }
  let options = Object.assign({}, otherOptions)
  Object.assign(requestHeaders, headers)
  if(!(otherOptions.body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json"
    options.body = JSON.stringify(otherOptions.body)
  }

  Object.assign(options, {headers: requestHeaders})


  return fetch(url, options, ...otherParams)
}


export const authenticate = (email, password) => {
  let credentials = new Buffer(`${email}:${password}`, 'utf8').toString('base64')
  console.log(credentials);
  return request("auth/token", {
    headers: {
      'Authorization': `Basic ${credentials}`
    }
  })
}


export const me = () => {
  return request("me")
}

export const getUsers = () => request("/users")

export const getUser = (number) => request("/users/" + number)

export const editUser = (number, data) => request("/users/" + number, {
  body: data,
  method: 'PUT'
})

export const createUser = (data) => request("/users/", {
  body: data,
  method: 'POST'
})

export const getPlaces = () => request("/places/")

export const getPlace = (number) => request("/places/" + number)

export const editPlace = (number, data) => request("/places/" + number, {
  body: data,
  method: 'PUT'
})

export const createPlace = (data) => request("/places/", {
  body: data,
  method: 'POST'
})

export const getCategories = () => request("/categories/")

export const getCategory = (number) => request('/categories/' + number)

export const editCategory = (number, data) => request("/categories/" + number, {
  body: data,
  method: 'PUT'
})

export const createCategory = (data) => request("/categories/", {
  body: data,
  method: 'POST'
})

export const createSubCategory = (catNumber, data) => request('/categories/' + number + '/subCategories', {
  body: data,
  method: 'POST'
})

export const editSubCategory = (catNumber, scNumber, data) => request('/categories/' + catNumber + '/subCategories/' + scNumber, {
  body: data,
  method: 'PUT'
})


export const getProviders = () => request("/providers/")

export const getProvider = (number) => request("/providers/" + number)

export const editProvider = (number, data) => request("/providers/" + number, {
  body: data,
  method: 'PUT'
})

export const createProvider = (data) => request("/providers/", {
  body: data,
  method: 'POST'
})

export const getProducts = () => request("/products/")

export const getProduct = (number) => request("/products/" + number)

export const editProduct = (number, data) => request("/products/" + number, {
  body: data,
  method: 'PUT'
})

export const createProduct = (data) => request("/products/", {
  body: data,
  method: 'POST'
})
