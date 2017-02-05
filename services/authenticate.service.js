import * as DB from "./db"

import jwt from "jsonwebtoken"

export const authenticate = async (email, password) => {
  let user = await DB.getUserByCredentials(email, password)
  console.log(user);
  if(user) {
    return generateToken(user)
  }
  return null
}

export const generateToken = (user) => {
  let roles = []
  user.isAdmin && roles.push("ADMIN")
  user.hasCompany && roles.push("SELLING_COMPANY_OWNER")
  return jwt.sign({
    number: user.number,
    email: user.email,
    roles,
  }, "shouldBeChanged!")
}

export const decodeToken = (token) => jwt.decode(token)
