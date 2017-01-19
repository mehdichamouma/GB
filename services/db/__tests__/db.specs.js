import {
  initDatabase,
  getUser,
  getAllUsers
} from "../index.js"

import resetDb from "../../../resetDb"
import {expect} from "chai"

describe("DB", () => {

  before(() => {
    return initDatabase({
      host     : 'localhost',
      user     : 'root',
      password : 'iut',
      multipleStatements: true
    }, "iut")
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
