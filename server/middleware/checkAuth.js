// check if user is authenticated and block dashboard access if not auth
exports.isLoggedIn = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    return res.status(401).send('Acess Denied....')
  }
}

// you can still create a page and use res.render to display a page other than access denied
