export default class Place {
  constructor(data) {
    this.number = data.number
    this.name = data.name
    this.placeFloor = data.placeFloor
    this.placeType = data.placeType
    this.products = data.products
    this.productCount = data.productCount
  }
}
