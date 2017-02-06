import {
  clearDatabase,
  createUser,
  createCategory,
  createSubCategory,
  createProvider,
  createPlace,
  createProduct,
  createRequest
} from "./services/db"

import {
  User,
  Category,
  SubCategory,
  Place,
  Provider,
  Product,
  Request
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
 }),
 new User({
   number: "3",
   username: "def",
   email: "def@john.fr",
   password: "azerty123"
 }),
 new User({
   number: "4",
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

let products = [
  new Product({
    number: "1",
    name: "Product A",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 9,
    category: categories[0],
    provider: providers[0],
    subCategory: subCategories[0],
    defaultPlace: places[0]
  }),
  new Product({
    number: "2",
    name: "Product B",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 17,
    category: categories[0],
    provider: providers[0],
    subCategory: subCategories[1],
    defaultPlace: places[1]
  }),
  new Product({
    number: "3",
    name: "Product C",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 20,
    category: categories[1],
    provider: providers[2],
    subCategory: subCategories[2],
    defaultPlace: places[0]
  }),
  new Product({
    number: "4",
    name: "Product D",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 10.4,
    category: categories[1],
    provider: providers[2],
    subCategory: subCategories[2],
    defaultPlace: places[2]
  }),
  new Product({
    number: "5",
    name: "Product E",
    unit: "kg",
    quantity: 15,
    thresholdQuantity: 30,
    price: 40,
    category: categories[2],
    provider: providers[1],
    subCategory: subCategories[3],
    defaultPlace: places[1]
  }),
]

let requests = [
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 1, 24),
    status: Request.STATUS.REFUSED
  }),
  new Request({
    requester: users[1],
    quantity: "50",
    product: products[1],
    requestDate: new Date(2017, 2, 1),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[2],
    quantity: "1200",
    product: products[1],
    requestDate: new Date(2017, 1, 8),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.COMPLETED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "60",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.ACCEPTED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.COMPLETED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.REFUSED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.CANCELED
  }),
  new Request({
    requester: users[2],
    quantity: "60",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.ACCEPTED
  }),

]
export default async (verbose = false) => {
  verbose && console.log("reset DB");
  await clearDatabase()
  await Promise.all(users.map(createUser))
  await Promise.all(categories.map(createCategory))
  await Promise.all(subCategories.map(createSubCategory))
  await Promise.all(providers.map(createProvider))
  await Promise.all(places.map(createPlace))
  await Promise.all(products.map(createProduct))
  await Promise.all(requests.map(createRequest))

  verbose && console.log("DB has been reset");


}
