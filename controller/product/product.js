/*
**************************************************
* 功能: category controller
* 作者: webB1an
**************************************************
*/
const productModel = require('../../models/product')
const relationModel = require('../../models/relation')
const output = require('../../utils/output')

class Product {
  // constructor() {}
  async list(req, res, next) {
    try {
      const result = await productModel.find({}, { _id: 0 })
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
      const result = await productModel.findOne({ id }, { _id: 0 })
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
      const result = await productModel.find(option, { _id: 0 })
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
    const { name, price = 0, url, pros = '空', cons = '空', description = '空' } = req.body
    if (!name || !url) {
      return output({
        status: 200,
        code: 1,
        msg: '参数不正确！'
      })(req, res, next)
    }
    try {
      const product = await productModel.find({ name })
      if (product.length) {
        output({
          status: 200,
          code: 1,
          msg: '该商品已存在！'
        })(req, res, next)
      } else {
        await productModel.insertMany([
          { name, price, url, pros, cons, description }
        ])
        output({
          status: 200,
          code: 0,
          msg: '创建成功！'
        })(req, res, next)
      }
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '创建失败！'
      })(req, res, next)
    }
  }

  async delete(req, res, next) {
    const { id } = req.body
    try {
      await productModel.deleteOne({ id })
      await relationModel.deleteOne({ productId: id })
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
    const { id, name, price, url, pros, cons, description } = req.body
    if (!name || !id || !url) {
      return output({
        status: 200,
        code: 1,
        msg: '参数不正确！'
      })(req, res, next)
    }
    try {
      const update = { name, price, url, pros, cons, description }
      await productModel.updateOne({ id }, { $set: update })
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

module.exports = new Product()
