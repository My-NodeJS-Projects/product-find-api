const Product = require('../models/product')

const getAllProducts = async (req, res) => {
  let { featured, company, name, sort, fields, numericFilters } = req.query

  // filteration
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  // Numeric filters

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '==': '$eq',
      '!=': '$ne',
    }
    const regExp = /\b(<|>|>=|<=|==|!=)\b/g
    const options = ['rating', 'price']
    let filters = numericFilters.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    )
    filters.split(',').forEach((filter) => {
      const [field, operator, value] = filter.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value }
      }
    })
    // console.log(queryObject)
  }

  let result = Product.find(queryObject)

  // Sorting
  if (sort) {
    sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  // Select fields
  if (fields) {
    fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  }

  // pagination with limit and skip
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const products = await result

  res.json({ nbHits: products.length, data: products })
}

module.exports = { getAllProducts }
