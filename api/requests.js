import express from "express"
let router = express.Router()

import {
  getRequestsByStatus,
  getAllRequests
} from "../services/products.service.js"

import {
  Product
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


export default router
