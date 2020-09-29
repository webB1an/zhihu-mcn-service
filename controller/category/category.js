/*
**************************************************
* 功能: category controller
* 作者: webB1an
**************************************************
*/
const categoryModel = require('../../models/category')
class Category {
  // constructor() {}
  async saveCategory(req, res, next) {
    const { name } = req.body
    const category = await categoryModel.findOne({ name })
    if (category) {
      res.json(category)
    } else {
      res.json({ name })
    }
  }
}

module.exports = new Category()
