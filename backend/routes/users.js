const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    let { username, password, email } = req.body;
    //field validation
    if (!username || !password || !email) {
        console.log("error in fields");
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }
    //email validation
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ msg: 'Email Already Registered!' });
            }
            const newUser = new User({
                username,
                password,
                email
            });
            //generate salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 * 2 },
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email
                                        }
                                    });
                                }
                            );
                        })
                        .catch((err) => {
                            res.status(400).json({
                                msg: 'Error!',
                                err: JSON.stringify(err)
                            })
                        });
                });
            });
        })
        .catch((err) => {
            res.status(400).json({
                msg: 'Error!',
                err: JSON.stringify(err)
            })
        });

});

module.exports = router;