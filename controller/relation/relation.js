const relationModel = require('../../models/relation')
const output = require('../../utils/output')

class Relation {
  async save(req, res, next) {
    const { productId, categoryIds } = req.body
    try {
      await relationModel.deleteMany({ productId })
      const relations = categoryIds.map(item => ({ productId, categoryId: item }))
      await relationModel.insertMany(relations)
      output({
        status: 200,
        code: 1,
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
}

module.exports = new Relation()
