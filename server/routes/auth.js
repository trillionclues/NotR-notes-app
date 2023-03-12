// define routes
const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      // fetch user details after auth
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      }

      // check if user already exists or then create one
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
)

// GOOGLE LOGIN ROUTE
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

// Retrieve user data
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
  })
)

// Route if something goes wrong
router.get('/login-failure', (req, res) => {
  res.send('Something went wrong...')
})

// Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error)
      res.send('Error while logging out')
    } else {
      res.redirect('/')
      // you can still create a new page to render other than redirecting to homepage
    }
  })
})

// Persit user data after succesfull auth
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// retrieve user data from sessiom
passport.deserializeUser(async (id, done) => {
  try {
    const userDone = await User.findById(id)
    done(null, userDone)
  } catch (error) {
    done(error)
  }

  // User.findById(id, function (err, user) {
  //   done(err, user)
  // })
})

// export router
module.exports = router
