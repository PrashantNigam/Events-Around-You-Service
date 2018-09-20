const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const common = require('../common/common')

/** This call registers a new user. It throws an error if the user is already registered
 * During registration, users shall provide information about their
preferences for events, namely the category and genre of the events they are interested in
attending. These preferences will be used to filter events later.
*/
router.post('/', (req, res, next) => {

    User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
        /**Check if user exists */
        if (user.length != 0) {
            /** Data conflict 409 */
            return res.status(409).json({
                message: "User already exists"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    createUser(req, hash, res);
                }
            });
        }
    });    
});

module.exports = router; 

function createUser(req, hash, res) {

    try{
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        common.data.validateClassifications(req.body.classifications);
        user.classifications = req.body.classifications;
        user
        .save()
        .then(result => {
            res.status(201).json({
                message: "User registration successful"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: e
        });
        return;
    }
}