const relationModel = require('../../models/relation')
const output = require('../../utils/output')

class Relation {
  async save(req, res, next) {
    const { categoryId, productIds } = req.body
    try {
      if (!categoryId) {
        return output({
          status: 200,
          code: 1,
          msg: '参数错误！'
        })(req, res, next)
      }
      await relationModel.deleteMany({ categoryId })
      const relations = productIds.map(item => ({ categoryId, productId: item }))
      await relationModel.insertMany(relations)
      output({
        status: 200,
        code: 0,
        msg: '保存成功！'
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '保存失败！'
      })(req, res, next)
    }
  }
  async list(req, res, next) {
    const { categoryId } = req.body
    if (!categoryId) {
      return output({
        status: 200,
        code: 1,
        msg: '参数错误！'
      })(req, res, next)
    }
    try {
      const result = await relationModel.aggregate([
        { $match: { categoryId }},
        { $project: { _id: 0, categoryId: 1, productId: 1 }},
        { $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: 'id',
          as: 'product'
        }},
        {
          $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] }}
        },
        { $project: { _id: 0, id: 0, __v: 0, product: 0, createTime: 0, updateTime: 0, categoryId: 0, productId: 0 }},
        { $sort: { price: 1 }}
      ]).exec()
      output({
        status: 200,
        code: 0,
        msg: 'ok!',
        data: result
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '获取失败！'
      })(req, res, next)
    }
  }
  async random(req, res, next) {
    const { categoryId } = req.body
    if (!categoryId) {
      return output({
        status: 200,
        code: 1,
        msg: '参数错误！'
      })(req, res, next)
    }
    try {
      const result = await relationModel.aggregate([
        { $match: { categoryId }},
        { $project: { _id: 0, categoryId: 1, productId: 1 }},
        { $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: 'id',
          as: 'product'
        }},
        {
          $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$product', 0] }, '$$ROOT'] }}
        },
        { $project: { _id: 0, id: 0, __v: 0, product: 0, createTime: 0, updateTime: 0, categoryId: 0, productId: 0 }},
        { $sample: { size: 10 }},
        { $sort: { price: 1 }}
      ]).exec()
      output({
        status: 200,
        code: 0,
        msg: 'ok!',
        data: result
      })(req, res, next)
    } catch (error) {
      output({
        status: 200,
        code: 1,
        msg: '获取失败！'
      })(req, res, next)
    }
  }
}

module.exports = new Relation()
