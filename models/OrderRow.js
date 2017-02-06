export default class OrderRow {
  constructor(data) {
    this.number = data.number
    this.product = data.product
    this.quantity = data.quantity
    this.effectiveQuantity = data.effectiveQuantity
    this.order = data.order
    this.unitPrice = data.unitPrice
    this.dlc = data.dlc
  }
}
