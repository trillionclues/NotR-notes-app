const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')

// delete endpoint
router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    })
    if (deletedNote.deletedCount === 0) {
      res.status(404).send('Note not found')
    } else {
      res.status(200).send('Note deleted successfully!')
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Error deleting note')
  }
})

module.exports = router
