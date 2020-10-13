/*
**************************************************
* 功能: category controller
* 作者: webB1an
**************************************************
*/
const categoryModel = require('../../models/category')
const output = require('../../utils/output')

class Category {
  // constructor() {}
  async save(req, res, next) {
    const { name, description } = req.body
    const category = await categoryModel.findOne({ name })
    if (category) {
      output({
        status: 200,
        code: 0,
        msg: '该分类已存在！'
      })(req, res, next)
    } else {
      await categoryModel.insertMany([{ name, description }])
      output({
        status: 200,
        code: 0,
        msg: '创建成功！',
        data: { name, description }
      })(req, res, next)
    }
  }
}

module.exports = new Category()
