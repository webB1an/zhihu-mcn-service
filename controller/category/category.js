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
    if (category.length) {
      output({
        status: 200,
        code: 1,
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

  async editor(req, res, next) {
    const { id, name, description = '' } = req.body
    if (!name || !id) {
      return output({
        status: 200,
        code: 1,
        msg: '参数不正确！'
      })(req, res, next)
    }
    try {
      const update = description ? { name, description } : { name }
      await categoryModel.updateOne({ id }, { $set: update })
      output({
        status: 200,
        code: 0,
        msg: '修改成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '修改失败！'
      })(req, res, next)
    }
  }
}

module.exports = new Category()
