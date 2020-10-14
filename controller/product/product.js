/*
**************************************************
* 功能: category controller
* 作者: webB1an
**************************************************
*/
const productModel = require('../../models/product')
const output = require('../../utils/output')

class Product {
  // constructor() {}
  async save(req, res, next) {
    const { name, price = 0, pros = '空', cons = '空', description = '空' } = req.body
    if (!name) {
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
          { name, price, pros, cons, description }
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

  async editor(req, res, next) {
    const { id, name, price, pros, cons, description } = req.body
    if (!name || !id) {
      return output({
        status: 200,
        code: 1,
        msg: '参数不正确！'
      })(req, res, next)
    }
    try {
      const update = { name, price, pros, cons, description }
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
