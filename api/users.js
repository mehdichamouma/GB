import express from "express"
let router = express.Router()

import {
  getAllUsers,
  getUserByNumber,
  createUser,
  updateUser
} from "../services/users.service"

import {
  User
} from "../models"

router.get("/", async (req, res) => {
  try {
    let users = await getAllUsers()
    res.json(users)
  } catch (e) {
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let userToCreate = req.body
    let userCreated = await createUser(userToCreate)
    res.json(userCreated)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let user = await getUserByNumber(req.params.number)
    if(user) {
      res.json(user)
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
    let user = new User({
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
