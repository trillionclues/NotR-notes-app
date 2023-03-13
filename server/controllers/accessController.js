// GET ACCESS DENIED
exports.accessDenied = async (req, res) => {
  // define locals data
  const locals = {
    title: 'Access Denied',
    description: 'You are not authorized to view this page',
    active: { accessDenied: true },
  }
  // render page
  res.render('access-denied', {
    locals,
    layout: '../views/layouts/access-denied',
  })
}
