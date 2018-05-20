var express = require('express');
var registerRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');

registerRouter.route('/')
.post(function(req,res){
    User.register(new User({username: req.body.username, email: req.body.email, address: req.body.address, admin: req.body.admin}),req.body.password, function(err,user){
      if(err){
        return res.status(500).json({err:err});
    }

    passport.authenticate('local')(req,res,function(){
      return res.status(200).json({status: 'Registration Successful!'});
    });
  });
});

module.exports = registerRouter;
