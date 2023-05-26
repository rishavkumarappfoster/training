const express = require("express");
const db = require("../models");
const jwt = require("jsonwebtoken");

const createError = require("../utils/error")

const Auth = db.auths;

const validateUser = async (req, res, next)=>{
    try{

        const Username = await Auth.findOne({where: {username:req.body.username}});
        if(Username){
            return res.status(409).send("This username is already in use")
        }

        const Useremail = await Auth.findOne({where: {email:req.body.email}});
        if(Useremail){
            return res.status(409).send("This email is already in use, try with another mail");
        }

        next();

    }catch(err){
        console.log(err);
    }
}

//verify tokens
const verifytokens = async (req, res, next)=>{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(401).send("You are not authenticated, Please Login.")
        }
        jwt.verify(token, process.env.secretKey, async (err, user)=>{
            if(err) return res.status(403).send("token is not valid")
            const detail = await Auth.findOne({where: {id:user.id}});
            
            req.user = user;
            req.detail = detail;
            next();
        })
    
}


module.exports = {
    validateUser,
    verifytokens
}