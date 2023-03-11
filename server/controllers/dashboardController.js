// GET DASHBOARD
exports.dashboard = async (req, res) => {
  // define locals data
  const locals = {
    title: 'Dashboard | Home',
    description:
      'This is the dashboard page. Here you can see all your data and manage your account.',
  }
  res.render('dashboard/index', {
    locals,
    layout: '../views/layouts/dashboard',
  })
}
