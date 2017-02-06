export default class Order {
  constructor(data) {
    this.number = data.number
    this.orderCreator = data.orderCreator
    this.orderDate = data.orderDate
    this.orderRows = data.orderRows
    this.status = data.status
    this.deliveryDate = data.deliveryDate
    this.effDeliveryDate = data.effDeliveryDate
  }
}
