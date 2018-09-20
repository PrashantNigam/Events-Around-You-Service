const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

/** For users to login to use the service. Since the API is RESTful, this implementation doesn't maintain
 *  session but uses authToken for authentications. There are authentication checks for each subsequent API call.
 */
router.post('/', (req, res, next) => {
    User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
        /** Check User presence */
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth Failed"
            }); 
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            /** Comparison Failed */
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            /** Check password */
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: "Auth Successful",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Auth Failed"
                });
            }                        
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router; 

