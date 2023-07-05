const mongoose = require('mongoose')
const products = require('./products.json')
const Product = require('./models/product')
require('dotenv').config()

async function seeder() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    console.log('DB connected')
    await Product.deleteMany()
    await Product.create(products)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

seeder()
