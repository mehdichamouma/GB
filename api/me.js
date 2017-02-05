import express from "express"
import {
  getUserByNumber
} from "../services/users.service"

let router = express.Router()

router.get("/", async (req, res) => {
  if(req.user != null) {
    try {
      let [user, notifications] = await Promise.all([
        getUserByNumber(req.user.number)
        //notificationsService.getNotifications(req.user.id)
      ])

      //let json = Object.assign({}, user, {notifications})
      let json = user

      return res.status(200).json(json)
    }
    catch(e) {
      console.error(e);
      return res.status(e.code).json(e.description)
    }
  }
  else {
    res.status(401).send("You are not log")
  }
})

export default router
