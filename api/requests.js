import express from "express"
let router = express.Router()

import {
  getRequestsByStatus,
  getAllRequests,
  updateRequest
} from "../services/products.service.js"

import {
  Product,
  Request
} from "../models"

router.get("/", async (req, res) => {
  try {
    let {status} = req.query
    let requests
    if(status) {
      requests = await getRequestsByStatus(status)
    }
    else {
      requests = await getAllRequests()
    }
    res.json(requests)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.put("/:number", async (req, res) => {
  try {
    let request = new Request({
      number: req.params.number,
      ...req.body
    })
    await updateRequest(request)
    res.json(request)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})
export default router
