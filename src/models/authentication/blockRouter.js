const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const configs = require('../../../config/db')
exports.verify = (req,res,next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
  jwt.verify(token, configs.secret, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    return next();
  });
}

