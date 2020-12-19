const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

const sendEmail = require('./email.send')
const msgs = require('./email.msgs')
const templates = require('./email.templates')

router.get('/', (req, res) => {
    console.log("users req.body");
    console.log(req.body);
    User.find()
        .then(users =>{
            console.log(users);
            res.json(users)})
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
                        .catch((err) =>{ 
                          console.log(err)
                          res.status(400).json({
                            msg: 'Error!',
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
          res.json({ msg: msgs.couldNotFind })
        }
        
        // The user exists but has not been confirmed. We need to confirm this 
        // user and let them know their email address has been confirmed.
        else if (user && !user.confirmed) {
          User.findByIdAndUpdate(id, { confirmed: true })
            .then(() => res.json({ msg: msgs.confirmed }))
            .catch(err => console.log(err))
        }
  
        // The user has already confirmed this email address.
        else  {
          res.json({ msg: msgs.alreadyConfirmed })
        }
  
      })
      .catch(err => console.log(err))
});
// router.post('/add', (req, res) => {
//     let { username, password, email, isAdmin } = req.body;
//     //field validation
//     if (!username || !password || !email) {
//         console.log("error in fields");
//         return res.status(400).json({ msg: 'Please enter all fields!' });
//     }
//     //email validation
//     User.findOne({ email })
//         .then(user => {
//             if (user) {
//                 return res.status(400).json({ msg: 'Email Already Registered!' });
//             }
//             const newUser = new User({
//                 username,
//                 password,
//                 email,
//                 isAdmin
//             });
//             //generate salt and hash
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     newUser.password = hash;
//                     newUser.save()
//                         .then((user) => {
//                             jwt.sign(
//                                 { id: user.id },
//                                 process.env.JWT_SECRET,
//                                 { expiresIn: 3600 * 2 },
//                                 (err, token) => {
//                                     if (err) {
//                                         throw err;
//                                     }
//                                     res.json({
//                                         token,
//                                         user: {
//                                             id: user.id,
//                                             username: user.username,
//                                             email: user.email,
//                                             isAdmin: user.isAdmin
//                                         }
//                                     });
//                                 }
//                             );
//                         })
//                         .catch((err) => {
//                             res.status(400).json({
//                                 msg: 'Error!',
//                                 err: JSON.stringify(err)
//                             })
//                         });
//                 });
//             });
//         })
//         .catch((err) => {
//             res.status(400).json({
//                 msg: 'Error!',
//                 err: JSON.stringify(err)
//             })
//         });

// });

module.exports = router;