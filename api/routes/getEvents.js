const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const request = require('request')

/** To get the events corresponding to the user’s preferences. To get this data, AWS API provided 
 * has been used. Since users have already provided their preferences, this API should uses that data.
 */
router.post('/', checkAuth, (req, res, next) => {

    const emailID = jwt.decode(req.body.token).email;
    User
        .findOne({ email: emailID }).exec()
        .then(result => {

            const preferences = getParamsList(result.classifications);
            url = getURL(preferences[0]);

            request({ url: url }, (error, response, body) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                } else {
                    res.status(200).json(JSON.parse(response.body)[1]);
                }                
            });   
            /** TODO implement promise for sequential async calls */
            // const events = []
            // for (let i = 0; i < preferences.length; i++) {

            //     url = getURL(preferences[i]);
            //     console.log(url)
            //     delay(url)
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/** TODO: Implement this method in a future iteration */
// function delay(url) {
//     return new Promise(function(resolve) { 
//         request({ url: url }, (error, response, body) => {
//             // res.status(200).json(response.body);
//             console.log(response.body.toString());
//         });
//     });
//  }

function getURL(preference) {
    url = 'https://' +
        process.env.AWS_USER +
        ':' +
        process.env.AWS_PASS +
        '@' +
        process.env.AWS_HOST +
        '?classificationName=' +
        preference[0] +
        '&genreId=' +
        preference[1];
    return url
}

function getParamsList(classifications) {

    const preferences = [];
    for (var classification of classifications) {
        for (var genre of classification.genres) {
            var preference = [classification.name, genre.genreId];
            preferences.push(preference);
        }
    }
    return preferences;
}

module.exports = router; 