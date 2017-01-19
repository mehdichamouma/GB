import {
  clearDatabase,
  createUser
} from "./services/db"

let users = [
  {
    usernumber: "1",
    username: "abc",
    email: "abc@john.fr",
    password: "azerty"
  },
  {
    usernumber: "2",
    username: "def",
    email: "def@john.fr",
    password: "azerty123"
  }
]

export default (verbose = false) => {
  verbose && console.log("reset DB");
  return clearDatabase()
  .then(() => Promise.all(users.map(u => createUser(u))))
  .then(() => {
    verbose && console.log("DB has been reset");
  })
}
