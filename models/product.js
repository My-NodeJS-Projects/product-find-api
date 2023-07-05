const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    minChar: [3, 'Product must have minimum 3 char'],
    maxChar: [30, 'Maxminum character is 30'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide the product price'],
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['marcos', 'liddy', 'ikea', 'caressa'],
      message: '{VALUE} is not supported',
    },

    // enum: ['marcos', 'liddy', 'ikea', 'caressa'],
  },
})

module.exports = mongoose.model('Product', productSchema)
