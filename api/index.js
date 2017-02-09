import express from "express"
import bodyParser from "body-parser"

import auth from "./auth"
import me from "./me"
import users from "./users"
import places from "./places"
import categories from "./categories"
import providers from "./providers"
import products from "./products"
import requests from "./requests"
import orders from "./orders"


let api = express.Router()

api.use(bodyParser.json());

api.use("/auth", auth)
api.use("/me", me)
api.use("/users", users)
api.use("/places", places)
api.use("/categories", categories)
api.use("/providers", providers)
api.use("/products", products)
api.use("/requests", requests)
api.use("/orders", orders)

import resetDb from "../resetDb"
import basic from "basic-auth"

// api.get("/me", (req, res) => {
//   if(req.user != null) {
//     Promise.all([
//       usersService.getUser(req.user.id),
//       notificationsService.getNotifications(req.user.id)
//     ])
//     .then(([user, notifications]) => {
//       let json = Object.assign({}, user, {notifications})
//       json.user.profilePicture = mediasService.getUrl(json.user.profilePicture)
//       if(json.company) {
//         json.company.image = mediasService.getUrl(json.company.image)
//       }
//       res.status(200).json(json)
//     })
//     .catch(e => {
//       console.error(e);
//       res.status(e.code).json(e.description)
//     })
//   }
//   else {
//     res.status(401).send("You are not log")
//   }
// })

api.get("/resetDB", (req, res) => {
    let o = basic(req)
    if(o) {
      let {name, pass} = o
      if(name == "admin" && pass == "azerty123") {
        return resetDb().then(() => {
          res.send("Database reinitialized")
        })
      }
    }
    return res.status(401).send("Authrorization needed")
})

export default api
