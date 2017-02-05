import express from "express"
import {authenticate, refresh} from "../services/authenticate.service"
import auth from "basic-auth"

let router = express.Router()

router.get("/token", (req, res) => {
  let o = auth(req)
  if(o) {
    let {name: email, pass: password} = o
    authenticate(email, password).then((token) => {
      if(token) {
        res.json({
          token: token
        })
      }
      else {
        res.status(403).json({
          error: "authentication failed"
        })
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(403).json({
        error: "authentication failed"
      })
    })
  }
  else {
    res.status(400).json({
      error: "missing or invalid basic authentication header"
    })
  }

})

export default router
