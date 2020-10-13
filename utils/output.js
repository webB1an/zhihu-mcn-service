module.exports = ({ status = 200, code = 0, msg = 'ok', data = {}}) => {
  return (req, res, next) => {
    res.json({
      code,
      msg,
      data
    })
  }
}
