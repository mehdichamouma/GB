import * as DB from "./db"
import {
  updateProductQuantity
} from "./products.service"
import {Order} from "../models"

export const getAllOrders = async () => {
  return await DB.getAllOrders()
}

export const createOrder = async (order) => {
  return await DB.createOrder(order)
}

export const getOrder = async (order) => {
  return await DB.getOrder(order)
}

export const updateOrder = async (order) => {
  if(order.status == Order.STATUS.DELIVERED) {
    let oldOrder = await getOrder(order)
    if(oldOrder.status == Order.STATUS.IN_PROCESS) {
      await Promise.all(order.orderRows.map((row => updateProductQuantity(row.product, row.effectiveQuantity))))
    }
    await DB.updateOrder({
      number: order.number,
      status: Order.STATUS.DELIVERED,
      effDeliveryDate: order.effDeliveryDate,
      orderRows: order.orderRows.map(row => ({
        product: row.product,
        effectiveQuantity: row.effectiveQuantity,
        place: row.place,
        dlc: row.dlc
      }))
    })
  }
  if(order.status == Order.STATUS.CANCELED || order.status == Order.STATUS.DENIED) {
    await DB.updateOrder({
      number: order.number,
      status: order.status,
      comment: order.comment
    })
  }
  if(order.status == Order.STATUS.IN_PROCESS) {
    await DB.updateOrder({
      number: order.number,
      status: order.status,
      extNumber: order.extNumber
    })
  }
}
