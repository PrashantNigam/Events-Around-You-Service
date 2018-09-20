const jwt = require('jsonwebtoken')

/** This method checks the authentication of the request made by the client by decoding the token containted
 * in the request received. If the token is hampered or is absent the authentication is failed.
 * This check is present before any API call including the AWS call is executed.
 */
module.exports = (req, res, next) => {
    /** Call next on successful authentication, throw an error otherwise */
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        return res.status(401).json({
            message: "Auth Failed"
        });
    }    
};