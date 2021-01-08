const router = require('express').Router();
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
let User = require('../models/user.model');

const sendEmail = require('./email.send')
const msgs = require('./email.msgs')
const templates = require('./email.templates')

router.get('/', (req, res) => {
  console.log("users req.body");
  console.log(req.body);
  User.find()
    .then(users => {
      console.log(users);
      res.json(users)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const { username, password, email, isAdmin } = req.body

  User.findOne({ email })
    .then(user => {

      // We have a new user! Send them a confirmation email.
      if (!user) {
        // User.create({ username, password, email, isAdmin })
        //   .then(newUser => sendEmail(newUser.email, templates.confirm(newUser._id)))
        //   .then(() => res.json({ msg: msgs.confirm }))
        //   .catch(err => console.log(err))
        //generate salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            User.create({ username, password: hash, email, isAdmin })
              .then(newUser => sendEmail(newUser.email, templates.confirm(newUser._id)))
              .then(() => res.json({ msg: msgs.confirm }))
              .catch((err) => {
                console.log(err)
                res.status(500).json({
                  msg: 'Status:500!Internal Server error.',
                  err: JSON.stringify(err)
                })
              })
          })
        })
      }

      // We have already seen this email address. But the user has not
      // clicked on the confirmation link. Send another confirmation email.
      else if (user && !user.confirmed) {
        sendEmail(user.email, templates.confirm(user._id))
          .then(() => res.json({ msg: msgs.resend }))
      }

      // The user has already confirmed this email address
      else {
        res.json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
});

router.get('/add/confirm/:id', (req, res) => {
  const { id } = req.params
  console.log("here at confirm");
  User.findById(id)
    .then(user => {

      // A user with that id does not exist in the DB. Perhaps some tricky 
      // user tried to go to a different url than the one provided in the 
      // confirmation email.
      if (!user) {
        res.status(200).json({ msg: msgs.couldNotFind })
      }

      // The user exists but has not been confirmed. We need to confirm this 
      // user and let them know their email address has been confirmed.
      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.statusCode(200).json({ msg: msgs.confirmed }))
          .catch(err => res.statusCode(500).json({ 
            msg: "Status:500!Internal Server error.",
            err
            }))
      }

      // The user has already confirmed this email address.
      else {
        res.status(200).json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
});


router.post('/forgot', (req, res) => {
  const { email } = req.body
  console.log("at forgot");
  User.findOne({ email })
    .then(user => {

      // We have a new user! Send them a confirmation email.
      if (!user) {
        res.status(404).json({ msg: msgs.couldNotFind })
      }
      else {
        crypto.randomBytes(20, function (err, buf) {
          var token = buf.toString('hex');
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000;
          user.save()
            .then(newUser => sendEmail(newUser.email, templates.reset(newUser.resetPasswordToken)))
            .then(() => {
              res.json({
                msg: "An Email with reset link has been sent to you."
              })
            })
            .catch(err => {
              console.log(err)
              res.status(500).json({
                msg: "Sorry! we ran into some problem.",
                err: JSON.stringify(err)
              })
            })
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        msg: "Sorry! we ran into some problem.",
        err: JSON.stringify(err)
      })
    })
});

router.post('/forgot/reset', (req, res) => {
  const { resetPasswordToken, password } = req.body
  console.log("here at reset confirm");
  User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        msg: "Sorry! we ran into some problem.",
        err: JSON.stringify(err)
      })
    }
    else if (!user) {
      res.status(404).json({ msg: 'Password reset token is invalid or has expired.' })
    }
    else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            res.status(500).json({
              msg: "Sorry! we ran into some problem.",
              err: JSON.stringify(err)
            })
          }
          else {
            user.password = hash
            user.save()
              .then(newUser => {
                console.log('success');
                res.status(200).json({ msg: "Password reset successfully" })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  msg: "Sorry! we ran into some problem.",
                  err: JSON.stringify(err)
                })
              })
          }
        })
      });
    }

  });
});

module.exports = router;