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
