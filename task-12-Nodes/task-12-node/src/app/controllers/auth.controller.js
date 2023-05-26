const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//create main model
const Auth = db.auths;

const register = async(req, res, next)=>{
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        let info = {
            username:req.body.username,
            email:req.body.email,
            gender:req.body.gender,
            phone:req.body.phone,
            address:req.body.address,
            isadmin:req.body.isadmin,
            password:hash
        }
    
        let user = await Auth.create(info);

        if(user){
            let token = jwt.sign({id:user.id, email:user.email}, process.env.secretKey,{
                expiresIn: 1 * 24 * 60 * 60 * 1000,
              });
              res.cookie("access_token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
              console.log(token);
              return res.status(201).send(user);
        }
        else {
              return res.status(409).send("Details are not correct");
        }

    }
    catch(err){
        console.log(err);
    }
}

const login = async (req, res, next)=>{
    try{

        let user = await Auth.findOne({where:{email:req.body.email}});
        if(!user){
            return res.status(400).send("Incorrect email or password");
        }
        else{
            let isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
            if(isPasswordCorrect){
                
                let token = req.cookies.access_token;
                if(!token){
                    token = jwt.sign({id:user.id, email:user.email}, process.env.secretKey, {
                        expiresIn:1 * 24 * 60 * 60 * 1000,
                    })
    
                    res.cookie("access_token", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true })
                    console.log(token);
                    return res.status(200).send("User is successfully login");
                }
                else{
                    jwt.verify(token, process.env.secretKey, async (err, user)=>{
                        if(err) return res.status(403).send("token is not valid")
                        return res.status(200).send("User is already login")
                    })
                }   
            }
            else{
                return res.status(400).send("Incorrect email or password");
            }
        }

    }catch(err){
        console.log(err);
    }
}

const showalluser = async(req, res)=>{
    try{
       let auths = await Auth.findAll({});
       res.status(200).send(auths);

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    register,
    login,
    showalluser
}