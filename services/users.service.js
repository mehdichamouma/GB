import * as DB from "./db"

export const getUserByNumber = async (number) => {
  let user = await DB.getUserByNumber(number)
  if(!user) {
    return Promise.reject("User not found")
  }
  return user
}

export const getAllUsers = async () => {
  return await DB.getAllUsers()
}

export const createUser = async (user) => {
  return await DB.createUser(user)
}


export const updateUser = async (user) => {
  return await DB.updateUser(user)
}
