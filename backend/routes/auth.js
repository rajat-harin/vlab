const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
let User = require('../models/user.model');

router.get('/', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ msg: 'Error!' }));
});

router.post('/', (req, res) => {
    let { password, email } = req.body;
    //field validation
    if (!password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }
    //email validation
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'User Does Not Exists!' });
            }

            //generate salt and hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ msg: 'Invalid Credentials!' });
                    }
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

        })
        .catch((err) => {
            res.status(400).json({
                msg: 'Error!',
                err: JSON.stringify(err)
            })
        });
});
module.exports = router;