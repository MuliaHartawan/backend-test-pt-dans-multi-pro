const jwt = require('jsonwebtoken');

const {JWT_SECRET_KEY} = process.env;

module.exports = async(req, res, next) => {

    const tokenHeader = req.headers.authorization || 'empty empty';
    if (tokenHeader.split(' ')[0] !== 'Bearer') {
        return res.status(500).send({
            message: "Error",
            errors: "Incorrect token format"
        });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET_KEY, function(err, decoded) {
        if(err) {
            return res.status(403).json({status : 'error', message : err});
        }
        req.user = decoded.data;
        return next();
    });
}