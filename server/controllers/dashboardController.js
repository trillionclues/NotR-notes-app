// Able to CRUD using Notes Model
const Note = require('../models/Notes')
const mongoose = require('mongoose')
const axios = require('axios')

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
      { $sort: { updatedAt: -1 } },
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

// GET SPECIFIC NOTES

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean()

  // check if we are getting the note
  if (note) {
    res.render('dashboard/view-note', {
      noteId: req.params.id,
      note,
      layout: '../views/layouts/dashboard',
    })
  } else {
    res.send('Something went wrong...')
  }
}

// PUT ? UPDATE SPECIFIC NOTES
exports.dashboardUpdateNote = async (req, res) => {
  try {
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id })
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

// DELETE SPECIFIC NOTES
// exports.dashboardDeleteNote = async (req, res) => {
//   console.log(req.params.id)
//   try {
//     await Note.deleteOne({
//       _id: req.params.id,
//       user: req.user.id,
//     }).where({ user: req.user.id })
//     if (deletedNote.deletedCount === 0) {
//       // If no notes were deleted, the ID was invalid or the note doesn't belong to the user
//       res.status(404).send('Note not found')
//     } else {
//       res.redirect('/dashboard')
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).send('Error deleting note')
//   }
// }
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id, user: req.user.id }).where({
      user: req.user.id,
    })
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error deleting note')
  }
}

// GET CREATE NOTE
exports.dashboardCreateNote = async (req, res) => {
  res.render('dashboard/create-note', {
    layout: '../views/layouts/dashboard',
  })
}

// POST CREATE NOTE
exports.dashboardCreateNotePost = async (req, res) => {
  try {
    req.body.user = req.user.id
    await Note.create(req.body)
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

// GET SEARCH NOTE
exports.dashboardSearchNote = async (req, res) => {
  try {
    res.render('dashboard/search-note', {
      searchResult: '',
      layout: '../views/layouts/dashboard',
    })
  } catch (error) {
    console.log(error)
  }
}

// POST SEARCH NOTE
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '')

    const searchResult = await Note.find({
      $or: [
        { title: { $regex: searchNoSpecialChars, $options: 'i' } },
        { body: { $regex: searchNoSpecialChars, $options: 'i' } },
      ],
    }).where({ user: req.user.id })

    res.render('dashboard/search-note', {
      searchResult,
      layout: '../views/layouts/dashboard',
    })
  } catch (error) {
    console.log(error)
  }
}
