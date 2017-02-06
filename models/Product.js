export default class Product {
  constructor(data) {
    this.number = data.number
    this.name = data.name
    this.defaultPlace = data.defaultPlace
    this.category = data.category
    this.subCategory = data.subCategory
    this.createdAt = data.createdAt
    this.quantity = data.quantity
    this.thresholdQuantity = data.thresholdQuantity
    this.stockEntries = data.stockEntries
    this.requests = data.requests
    this.productPrice = data.productPrice
    this.provider = data.provider
    this.unit = data.unit
    this.price = data.price
  }
}
