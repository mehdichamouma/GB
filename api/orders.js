import express from "express"
let router = express.Router()

import {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  createCategory,
  updateCategory,
  getCategory,
  createSubCategory,
  updateSubCategory,
  getSubCategory
} from "../services/orders.service"

import {
  Order,
  OrderRow
} from "../models"

router.get("/", async (req, res) => {
  try {
    let orders = await getAllOrders()
    res.json(orders)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let order = new Order({
      orderCreator: {
        number: req.user.number,
      },
      orderDate: new Date(),
      status: Order.STATUS.NEW,
      deliveryDate: new Date(req.body.deliveryDate),
      orderRows: req.body.orderRows.map(r => new OrderRow({
        quantity: r.quantity,
        unitPrice: r.unitPrice,
        product: {
          number: r.productNumber
        }
      }))

    })
    await createOrder(order)
    console.log(order);
    res.json(order)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let order = await getOrder(new Order({
      number: req.params.number
    }))
    if(order) {
      res.json(order)
    }
    else {
      res.status(404).json("Ressource not found")
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})

router.put("/:number", async (req, res) => {
  try {
    console.log(req.body);
    let {orderRows, ...orderData} = req.body
    let order = new Order({
      number: req.params.number,
      ...orderData,
      orderRows: orderRows.map(o => {
        let {placeNumber, ...orderRowData} = o
        return new OrderRow({
          ...orderRowData,
          place: {
            number: placeNumber
          }
        })
      })
    })
    await updateOrder(order)
    console.log(order);

    res.json(order)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})

router.post("/:catNumber/subCategories", async (req, res) => {
  try {
    let subCategory = new SubCategory({
      category: {
        number: req.params.catNumber
      },
      ...req.body
    })

    let r = await createSubCategory(subCategory)
    res.json(r)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.put("/:catNumber/subCategories/:number", async (req, res) => {
  try {
    let subCategory = new SubCategory({
      number: req.params.number,
      category: {
        number: req.params.catNumber
      },
      ...req.body
    })

    let r = await updateSubCategory(subCategory)
    res.json(r)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.get("/:catNumber/subCategories/:number", async (req, res) => {
  try {
    let subCategory = new SubCategory({
      number: req.params.number
    })

    let r = await getSubCategory(subCategory)
    res.json(r)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})
export default router
