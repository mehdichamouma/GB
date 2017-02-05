import express from "express"
let router = express.Router()

import {
  createPlace,
  getAllPlaces,
  updatePlace,
  getPlace
} from "../services/products.service"

import {
  Place
} from "../models"

router.get("/", async (req, res) => {
  try {
    let places = await getAllPlaces()
    res.json(places)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let place = new Place(req.body)
    let placeCreated = await createPlace(place)
    res.json(placeCreated)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let place = await getPlace(new Place({
      number: req.params.number
    }))
    if(place) {
      res.json(place)
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
    let user = new Place({
      number: req.params.number,
      ...req.body
    })
    await updateUser(user)
    res.json(user)
  }
  catch (e) {
    console.error(e);
    res.status(500).json(e)
  }
})
export default router
