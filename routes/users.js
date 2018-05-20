var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');

/* GET users listing. */
userRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req, res, next) {
    User.find(req.query, function(err,user){
      if(err) next(err);
      res.json(user);
    });
});

userRouter.route('/logout')
.get(function(req,res){
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});



userRouter.route('/:userId')
.get(function(req,res,next){
    User.findById(req.params.userId,function(err,user){
        if (err) next(err);
        res.json(user);
    });
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req,res,next){
  User.findByIdAndUpdate(req.params.userId, {
      $set: req.body
  },{
      new: true
  },function(err,user){
      if (err) next(err);
      res.json(user);
  })
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next){
  User.remove({_id:req.params.userId},function(err,resp){
    if(err) next(err);
    res.json(resp);
});
})
;


userRouter.route('/add') 
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res){
    User.register(new User({username: req.body.username, email: req.body.email, address: req.body.address, admin: req.body.admin}),req.body.password, function(err,user){
      if(err){
        return res.status(500).json({err:err});
    }

    passport.authenticate('local')(req,res,function(){
      return res.status(200).json({status: 'Registration Successful!'});
    });
  });
});

userRouter.route('/login')
.post(function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
      /**/
          res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token
        });
    });
  })(req,res,next);
});



module.exports = userRouter;
