var User = require('../models/user');
var jwt = require('jsonwebtoken');

var config = require('../config.js');

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function(req,res,next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token)
    {
        jwt.verify(token,config.secretKey, function(err,decoded){
            if(err)
            {
                var err = new Error ('Not Authenticated!');
                err.status = 401;
                return next(err);
            }
            else
            {
                req.decode = decoded;
                next();
            }
        });
    }
    else
    {
        var err = new Error('No Token Provided');
        err.status = 403;
        return next(err);
    }

};

exports.verifyAdmin = function(req,res,next){
    if(req.decode._doc.admin == false)
        {

            var err = new Error("You are not authorized to perform this operation!");
            err.status = 403;
            return next(err);
        }
        else{
            next();
        }

};