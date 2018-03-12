const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

exports.getAllUsers = async (application, req, res) => {return res.json(await User.find())}

exports.newUser = async (application, req, res) => {
  req.body.password = await crypto.createHash("md5").update(req.body.password).digest("hex")
  let newUser = new User({
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  })
  let saveUser = await newUser.save()
  if(!saveUser) return res.json({status:false,msg:"Usuário não foi cadastrado."})
  return res.json({status:true,msg:"Usuário foi cadastrado."})
}

exports.authenticate = async (application, req, res) => {
  req.body.password = await crypto.createHash("md5").update(req.body.password).digest("hex")

  const user = await User.findOne({name:req.body.name, password:req.body.password})
  console.log(user)
  if(user==null) return res.json({ success: false, message: 'Authentication failed. User not found.' })
  const payload = {admin: user.admin}
  console.log(payload.admin)
  let token = await jwt.sign(payload, application.get('superSecret'), {expiresIn: '24h'});
  return res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  })

}
