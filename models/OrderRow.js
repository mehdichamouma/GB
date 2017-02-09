export default class OrderRow {
  constructor(data) {
    this.product = data.product
    this.quantity = parseFloat(data.quantity)
    if(data.dlc) {
      this.dlc = new Date(data.dlc)
    }
    this.effectiveQuantity = parseFloat(data.effectiveQuantity)
    this.order = data.order
    this.unitPrice = data.unitPrice
    this.effectiveTVA = data.effectiveTVA
    this.place = data.place
  }
}
