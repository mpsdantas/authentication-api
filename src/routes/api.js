const user = require('../controllers/user')
const blockRouter = require('../models/authentication')
module.exports = (application) => {
  application.get('/api', (req, res) => {res.json({ message: 'Welcome to the coolest API on earth!' })})
  application.get('/api/users',(req,res) => {
    blockRouter.verify(application,req,res)
    user.getAllUsers(application,req,res,decoder)
  })
  application.post('/api/new-user', (req,res) => { user.newUser(application, req, res)})
  application.post('/api/authenticate', (req, res) =>{user.authenticate(application,req,res)})
}
