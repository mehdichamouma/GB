import {
  clearDatabase,
  createUser,
  createCategory,
  createSubCategory,
  createProvider,
  createPlace
} from "./services/db"

import {
  User,
  Category,
  SubCategory,
  Place,
  Provider
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

let providers = [
  new Provider({
    number: "1",
    name: "A",
    adress: "rue de la ...",
    postCode: "34090",
    city: "Montpellier",
    phoneNumber: "0606060606",
    fax: "0606060606",
    email: "contact@providerA.fr",
  }),
  new Provider({
    number: "2",
    name: "B",
    adress: "rue de la ...",
    postCode: "34090",
    city: "Montpellier",
    phoneNumber: "0606060606",
    fax: "0606060606",
    email: "contact@providerB.fr",
  }),
  new Provider({
    number: "3",
    name: "C",
    adress: "rue de la ...",
    postCode: "34090",
    city: "Montpellier",
    phoneNumber: "0606060606",
    fax: "0606060606",
    email: "contact@providerC.fr",
  }),
  new Provider({
    number: "4",
    name: "D",
    adress: "rue de la ...",
    postCode: "34090",
    city: "Montpellier",
    phoneNumber: "0606060606",
    fax: "0606060606",
    email: "contact@providerD.fr",
  }),
]

let places = [
  new Place({
    number: "1",
    name: "Réserve produit chimique",
    placeFloor: "RDC",
    placeType: 0,
  }),
  new Place({
    number: "2",
    name: "Animalerie",
    placeFloor: "RDC",
    placeType: 0,
  }),
  new Place({
    number: "3",
    name: "Réservoir congélateur",
    placeFloor: "1",
    placeType: 1,
  })
]

export default async (verbose = false) => {
  verbose && console.log("reset DB");
  await clearDatabase()
  await Promise.all(users.map(createUser))
  await Promise.all(categories.map(createCategory))
  await Promise.all(subCategories.map(createSubCategory))
  await Promise.all(providers.map(createProvider))
  await Promise.all(places.map(createPlace))
  verbose && console.log("DB has been reset");
}
