import express from "express"
let router = express.Router()

import {
  createProvider,
  getAllProviders,
  updateProvider,
  getProvider
} from "../services/products.service.js"

import {
  Provider
} from "../models"

router.get("/", async (req, res) => {
  try {
    let providers = await getAllProviders()
    res.json(providers)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let provider = new Provider(req.body)
    let providerCreated = await createProvider(provider)
    res.json(providerCreated)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let provider = await getProvider(new Provider({
      number: req.params.number
    }))
    if(provider) {
      console.log(provider);
      res.json(provider)
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
    let provider = new Provider({
      number: req.params.number,
      ...req.body
    })
    await updateProvider(provider)
    res.json(provider)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})
export default router
