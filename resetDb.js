import {
  clearDatabase,
  createUser,
  createCategory,
  createSubCategory
} from "./services/db"

import {
  User,
  Category,
  SubCategory,
  Place
} from "./models"

let users = [
  new User({
    number: "1",
    username: "abc",
    email: "abc@john.fr",
    password: "azerty"
 }),
 new User({
   number: "2",
   username: "def",
   email: "def@john.fr",
   password: "azerty123"
 })
]

let categories = [
  new Category({
    number: "1",
    name: "chimie",
    managedBy: users[0]
  }),
  new Category({
    number: "2",
    name: "biologie",
    managedBy: users[0]
  }),
  new Category({
    number: "3",
    name: "microbio",
    managedBy: users[1]
  }),
]


let subCategories = [
  new SubCategory({
    number: "1",
    name: "chimie_1",
    category: categories[0]
  }),
  new SubCategory({
    number: "2",
    name: "chimie_2",
    category: categories[0]
  }),
  new SubCategory({
    number: "3",
    name: "biologie_1",
    category: categories[1]
  }),
  new SubCategory({
    number: "4",
    name: "microbio_1",
    category: categories[2]
  })
]

export default async (verbose = false) => {
  verbose && console.log("reset DB");
  await clearDatabase()
  await Promise.all(users.map(createUser))
  await Promise.all(categories.map(createCategory))
  await Promise.all(subCategories.map(createSubCategory))
  verbose && console.log("DB has been reset");
}
