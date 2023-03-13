// Able to CRUD using Notes Model
const Note = require('../models/Notes')
const mongoose = require('mongoose')

// GET DASHBOARD
exports.dashboard = async (req, res) => {
  // manually dummy notes data to database
  // async function dummyNotesData() {
  //   try {
  //     await Note.insertMany([
  //       {
  //         user: '640da4f1416ccd6d8ce07ac6',
  //         title: 'Alx fullstack project',
  //         body: 'This is a fullstack project for Alx',
  //         createdAt: '2021-03-01T12:00:00.000Z',
  //       },
  //     ])
  //   } catch (error) {
  //     console.log('err', +error)
  //   }
  // }

  // pagination
  let notesPerPage = 12
  let page = req.query.page || 1

  // define locals data
  const locals = {
    title: 'Dashboard | Home',
    description:
      'This is the dashboard page. Here you can see all your data and manage your account.',
  }

  // use the notes data
  try {
    // notes data sort and aggregate
    const notes = await Note.aggregate([
      { $sort: { createdAt: -1 } },
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ['$title', 0, 30] },
          body: {
            $concat: [
              {
                $substr: ['$body', 0, 100],
              },
              '...',
            ],
          },
        },
      },
    ])
      .skip(notesPerPage * page - notesPerPage)
      .limit(notesPerPage)
      .exec()

    // count notes
    const count = await Note.countDocuments({ user: req.user.id })

    // render the notes
    res.render('dashboard/index', {
      userName: req.user.firstName
        ? req.user.firstName
        : req.user.email.split('@')[0],
      locals,
      notes,
      layout: '../views/layouts/dashboard',
      current: page,
      pages: Math.ceil(count / notesPerPage),
    })
  } catch (error) {
    console.log(error)
  }
}
