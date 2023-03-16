// GET HOMEPAGE
exports.homepage = async (req, res) => {
  // define locals data
  const locals = {
    title: 'NotR | Home',
    description:
      'NotR is a simple note taking app that helps you to take notes and save them for later use.',
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
    title: 'NotR | About',
    description:
      'NotR is a simple note taking app that helps you to take notes and save them for later use.',
  }
  res.render('about', locals)
}

// GET FEATURES
exports.features = async (req, res) => {
  // define locals data
  const locals = {
    title: 'NotR | Features',
    description:
      'NotR is a simple note taking app that helps you to take notes and save them for later use.',
  }
  res.render('features', locals)
}
