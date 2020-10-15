const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    //check for token
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorised User!' });
    }
    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //Add user payload
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Invalid Token!' });
    }

}

module.exports = auth;