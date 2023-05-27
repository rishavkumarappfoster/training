const express = require("express");
const db = require("../models");
const jwt = require("jsonwebtoken");

const createError = require("../utils/error")

const Auth = db.auths;

const validateUser = async (req, res, next)=>{
    try{

        const Useremail = await Auth.findOne({where: {email:req.body.email}});
        if(Useremail){
            return res.status(409).send("This email is already in use, try with another mail");
        }

        const findUserByUsername = await Auth.findOne({where: {username:req.body.username}});
        if(findUserByUsername){
            //if username is in use then create new unique username.
            let uniqueUsername = req.body.username;
            let usernameExists = true;

            while(usernameExists){
                const existingUser = await Auth.findOne({where:{username:uniqueUsername}});
                if(existingUser){//if this username is already in use create new ones
                    const randomString = Math.random().toString(36).substring(2, 8);
                    uniqueUsername = `${req.body.username}-${randomString}`;
                }
                else{//finded unique user name
                    usernameExists = false;
                }
            }
            req.body.username = uniqueUsername;
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