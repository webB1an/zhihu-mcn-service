/*
**************************************************
* 功能: category controller
* 作者: webB1an
**************************************************
*/
const categoryModel = require('../../models/category')
const relationModel = require('../../models/relation')
const output = require('../../utils/output')

class Category {
  // constructor() {}
  async list(req, res, next) {
    try {
      const result = await categoryModel.find({}, { _id: 0 })
      output({
        status: 200,
        code: 0,
        data: result,
        msg: '数据获取成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '数据获取失败！'
      })(req, res, next)
    }
  }
  async detail(req, res, next) {
    const { id } = req.body
    try {
      const result = await categoryModel.findOne({ id }, { _id: 0 })
      output({
        status: 200,
        code: 0,
        data: result,
        msg: '数据获取成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '数据获取失败！'
      })(req, res, next)
    }
  }
  async search(req, res, next) {
    let { name = '' } = req.body
    name = name.trim()
    const option = name ? { name: new RegExp(name) } : {}
    try {
      const result = await categoryModel.find(option, { _id: 0 })
      output({
        status: 200,
        code: 0,
        data: result,
        msg: '数据获取成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '数据获取失败！'
      })(req, res, next)
    }
  }
  async save(req, res, next) {
    const { name, description } = req.body
    const category = await categoryModel.find({ name })
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

  async delete(req, res, next) {
    const { id } = req.body
    try {
      await categoryModel.deleteOne({ id })
      await relationModel.deleteOne({ categoryId: id })
      output({
        status: 200,
        code: 0,
        msg: '删除成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '删除失败'
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
