require("dotenv").config()

export default {
  DB: {
    HOST: process.env.GB_DB_HOST,
    USER: process.env.GB_DB_USER,
    NAME: process.env.GB_DB_NAME,
    PASSWORD: process.env.GB_DB_PASSWORD
  }
}
