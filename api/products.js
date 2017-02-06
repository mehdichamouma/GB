import express from "express"
let router = express.Router()

import {
  createProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  createRequest,
  updateRequest
} from "../services/products.service.js"

import {
  Product,
  Request
} from "../models"

router.get("/", async (req, res) => {
  try {
    let products = await getAllProducts()
    res.json(products)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let {
      categoryNumber,
      defaultPlaceNumber,
      providerNumber,
      subCategoryNumber,
      ...productData
    } = req.body
    let product = new Product({
      ...productData,
      category: {
        number: categoryNumber,
      },
      defaultPlace: {
        number: defaultPlaceNumber,
      },
      provider: {
        number: providerNumber,
      },
      subCategory: {
        number: subCategoryNumber,
      },
    })
    let res = await createProduct(product)
    res.json(product)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let product = await getProduct(new Product({
      number: req.params.number
    }))
    if(product) {
      res.json(product)
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
    let product = new Product({
      number: req.params.number,
      ...req.body
    })
    await updateProduct(product)
    res.json(product)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})

router.post("/:number/requests", async (req, res) => {
  try {
    console.log(req.user);
    let request = new Request({
      product: {
        number: req.params.number
      },
      requester: {
        number: req.user.number
      },
      ...req.body,
      requestDate: new Date(),
      status: Request.STATUS.PENDING
    })
    await createRequest(request)
    res.json(request)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})


export default router
