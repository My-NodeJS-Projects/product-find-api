const express = require('express')
require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const productRoutes = require('./routes/products')

const app = express()
const PORT = process.env.PORT || 3000

// routes
app.use('/api/v1/products', productRoutes)

app.use(notFound)
app.use(errorHandler)

async function main() {
  try {
    // connect DB
    await connectDB(process.env.MONGO_URI)
    console.log(`Database connected`)
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
main()
