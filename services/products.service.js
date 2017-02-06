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


export const getAllCategories = async () => {
  return await DB.getAllCategories()
}
export const createCategory = async (category) => {
  return await DB.createCategory(category)
}
export const updateCategory = async (category) => {
  return await DB.updateCategory(category)
}

export const getCategory = async (category) => {
  return await DB.getCategory(category)
}

export const createSubCategory = async (subCategory) => {
  return await DB.createSubCategory(subCategory)
}
export const updateSubCategory = async (subCategory) => {
  return await DB.updateSubCategory(subCategory)
}
export const getSubCategory = async (subCategory) => {
  return await DB.getSubCategory(subCategory)
}

export const getProvider = async (place) => {
  let providerFromDb = await DB.getProvider(place)
  if(!providerFromDb) {
    return Promise.reject("User not found")
  }
  return providerFromDb
}

export const getAllProviders = async () => {
  return await DB.getAllProviders()
}

export const createProvider = async (place) => {
  return await DB.createProvider(place)
}


export const updateProvider = async (place) => {
  return await DB.updateProvider(place)
}

export const getProduct = async (place) => {
  let productFromDb = await DB.getProduct(place)
  if(!productFromDb) {
    return Promise.reject("User not found")
  }
  return productFromDb
}

export const getAllProducts = async () => {
  return await DB.getAllProducts()
}

export const createProduct = async (product) => {
  return await DB.createProduct(product)
}


export const updateProduct = async (product) => {
  return await DB.updateProduct(product)
}

export const createRequest = async (request) => {
  return await DB.createRequest(request)
}

export const updateRequest = async (request) => {
  return await DB.updateRequest(request)
}

export const getRequestsByStatus = async (status) => {
  return await DB.getRequestsByStatus(status)
}

export const getAllRequests = async (status) => {
  return await DB.getAllRequests()
}
