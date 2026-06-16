let checkLogin = (req, res, next) => {
  if (req.session.userName) {
    next()
  } else {
    res.redirect('/login')
  }
}
module.exports = checkLogin
