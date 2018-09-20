const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const common = require('../common/common');
const checkAuth = require('../middleware/checkAuth');
const jwt = require('jsonwebtoken');

/** To allow the user to change his/her preferences for events. */
router.put('/', checkAuth, (req, res, next) => {

    const newClassifications = req.body.classifications;
    
    try{
        common.data.validateClassifications(newClassifications);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            error: e
        });
        return;
    }

    /** Retrieve email-id from auth token. It is assumed that client sends auth token in the body of the request.
     * An error is generated in the absence of a token or an invalid token.
     */
    const emailID = jwt.decode(req.body.token).email;
    User
    .update({ email: emailID }, { $set: { classifications: newClassifications }})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
    res.status(201).json({
        message: "Preferences Changed",
        preferences: newClassifications     
    });
});

module.exports = router; 