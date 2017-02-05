export default class Category {
  constructor(data) {
    this.number = data.number
    this.name = data.name
    this.managedBy = data.managedBy
    this.subCategories = data.subCategories
    this.products = data.products
  }
}
