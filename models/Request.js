export default class Request {
  constructor(data) {
    this.number = data.number
    this.requester = data.requester
    this.quantity = data.quantity
    this.product = data.product
    this.requestDate = data.requestDate
    this.status = data.status
  }
}

Request.STATUS = {
  PROCESSED: "REQUEST_PROCESSED",
  PENDING: "REQUEST_PENDING",
  ACCEPTED: "REQUEST_ACCEPTED",
  CANCELED: "REQUEST_CANCELED",
  REFUSED: "REQUEST_REFUSED",
  COMPLETED: "REQUEST_COMPLETED"
}
