// GET HOMEPAGE
exports.homepage = async (req, res) => {
  // define locals data
  const locals = {
    title: 'Notefy | Home',
    description:
      'Notefy is a simple note taking app that helps you to take notes and save them for later use.',
  }
  res.render('index', {
    locals,
    layout: '../views/layouts/front-page',
  })
}

// GET ABOUT
exports.about = async (req, res) => {
  // define locals data
  const locals = {
    title: 'Notefy | About',
    description:
      'Notefy is a simple note taking app that helps you to take notes and save them for later use.',
  }
  res.render('about', locals)
}
