import {
  initDatabase,
  getUser,
  getAllUsers
} from "../index.js"

import resetDb from "../../../resetDb"
import {expect} from "chai"
import config from "../../../config"

describe("DB", function() {
  this.timeout(0)
  before(() => {
    return initDatabase({
      host     : config.DB.HOST,
      user     : config.DB.USER,
      password : config.DB.PASSWORD,
      multipleStatements: true
    }, config.DB.NAME)
  })

  beforeEach(() => {
    return resetDb()
  })


  describe("getUser", () => {
    it("should return an user", () => {
      return getUser("1").then((user) => {
        expect(user.USERNUMBER).to.eql(1)
        expect(user.EMAIL).to.eql("abc@john.fr")
      })
    })
  })


  describe("getAllUsers", () => {
    it("should return all the users", () => {
      return getAllUsers(1).then((user) => {

      })
    })
  })


})
