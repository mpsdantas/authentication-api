const jwt = require('jsonwebtoken')
const crypto = require('crypto')
exports.verify = (application,req,res) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
  jwt.verify(token, application.get('superSecret'), (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
  });
}
