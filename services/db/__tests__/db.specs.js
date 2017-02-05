import {
  initDatabase,
  getUserByNumber,
  getAllUsers
} from "../index.js"

import resetDb from "../../../resetDb"
import {expect} from "chai"
import config from "../../../config"
import {
  User
} from "../../../models/User"

describe("DB", function() {
  this.timeout(0)
  before(async () => {
    await initDatabase({
      host     : config.DB.HOST,
      user     : config.DB.USER,
      password : config.DB.PASSWORD,
      multipleStatements: true
    }, config.DB.NAME)
    await resetDb()
  })

  describe("getUserByNumber", () => {
    it("should return an user", async () => {
      let user = await getUserByNumber("1")
      expect(user.number).to.eql(1)
      expect(user.email).to.eql("abc@john.fr")
    })
  })


  describe("getAllUsers", () => {
    it("should return all the users", async () => {
      let users = await getAllUsers(1)
      expect(users).to.have.a.lengthOf(2)
    })
  })




})
