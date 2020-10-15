const router = require('express').Router();
let Topic = require('../models/topic.model');

router.get('/', (req, res) => {
    Topic.find()
        .then(topics => res.json(topics))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.get('/branchData/:name', (req, res) => {
    Topic.find({
        branch: req.params.name
    })
        .then(subject => {
            res.json(subject)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});

router.get('/:name', (req, res) => {
    Topic.find({
        name: req.params.name
    })
        .then(subject => {
            res.json(subject)
        })
        .catch(err => {
            res.status(400).json('Error: ' + err)
        });
});


router.post('/', (req, res) => {
    let { name, branch, subject, introduction, theory, objective, procedure } = req.body;
    //field validation
    if (!name || !branch || !subject) {
        console.log("error in fields");
        return res.status(400).json({ msg: 'Please enter all fields!' });
    }
    //name validation
    Topic.findOne({ name })
        .then(topic => {
            if (topic) {
                return res.status(400).json({ msg: 'Topic Already Exists!' });
            }
            const newTopic = new Topic({
                name,
                branch,
                subject,
                introduction,
                theory,
                objective,
                procedure
            });

            newTopic.save()
                .then((topic) => {
                    res.json({
                        msg: "Topic Added Successfully"
                    });
                }
                )
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