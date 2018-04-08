const jwt = require('jsonwebtoken')

module.exports = {
    check : (req, res, next) => {
        let isToken = req.headers.token;
        
        if (isToken) {
            try {
                let token = jwt.verify(isToken, process.env.SECRET)
                req.decoded = token
                next();
            } catch(err) {
                res.status(500).json({
                    message : 'Token is wrong',
                    error: err
                })
            }
        } else {
            res.status(500).json({
                message : 'Action Failed...You Must have token..Please Login first!!'
            })
        }
    }
  
};