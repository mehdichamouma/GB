export default class Order {
  constructor(data) {
    this.number = data.number
    this.orderCreator = data.orderCreator
    this.orderDate = data.orderDate
    this.orderRows = data.orderRows
    this.status = data.status
    this.extNumber = data.extNumber
    this.comment = data.comment
    if(data.deliveryDate) {
      this.deliveryDate = new Date(data.deliveryDate)
    }
    if(data.effDeliveryDate) {
      this.effDeliveryDate = new Date(data.effDeliveryDate)
    }
  }
}

Order.STATUS = {
  "NEW": "ORDER_NEW",
  "CANCELED": "ORDER_CANCELED",
  "DENIED": "ORDER_DENIED",
  "IN_PROCESS": "ORDER_IN_PROCESS",
  "DELIVERED": "ORDER_DELIVERED"
}
