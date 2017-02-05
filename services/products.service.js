import * as DB from "./db"

export const getPlace = async (place) => {
  let placeFromDb = await DB.getPlace(place)
  if(!placeFromDb) {
    return Promise.reject("User not found")
  }
  return placeFromDb
}

export const getAllPlaces = async () => {
  return await DB.getAllPlaces()
}

export const createPlace = async (place) => {
  return await DB.createPlace(place)
}


export const updatePlace = async (place) => {
  return await DB.updatePlace(place)
}
