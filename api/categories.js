import express from "express"
let router = express.Router()

import {
  getAllCategories,
  createCategory,
  updateCategory,
  getCategory,
  createSubCategory,
  updateSubCategory,
  getSubCategory
} from "../services/products.service"

import {
  Category
} from "../models"

router.get("/", async (req, res) => {
  try {
    let categories = await getAllCategories()
    res.json(categories)
  } catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})

router.post("/", async (req, res) => {
  try {
    let {managerNumber, ...categoryData} = req.body
    let category = new Category({
      ...categoryData,
      managedBy: {
        number: managerNumber
      },
    })
    let r = await createCategory(category)
    res.json(r)
  }
  catch (e) {
    console.error(e);
    res.status(500).json("error")
  }
})


router.get("/:number", async (req, res) => {
  try {
    let cat = await getCategory(new Category({
      number: req.params.number
    }))
    if(cat) {
      res.json(cat)
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
    let {managerNumber, ...categoryData} = req.body
    let category = new Category({
      number: req.params.number,
      ...categoryData,
      managedBy: {
        number: managerNumber
      },
    })
    await updateCategory(category)
    res.json(category)
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
