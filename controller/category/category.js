const categoryModel = require('../../models/category')
class Category {
  // constructor() {}
  async saveCategory(req, res, next) {
    const { name } = req.body
    const category = await categoryModel.findOne({ name })
    if (category) {
      return category
    } else {
      return false
    }
  }
}

module.exports = new Category()
