const db = require("../models");

//create main model
const User = db.users
const Project = db.projects


//main work 

//1.  create product

const addUser = async (req, res)=>{
    try{
        let info = {
            name: req.body.name,
            email: req.body.email,
            gender:req.body.gender,
            status: req.body.status
        }
    
        const user = await User.create(info)
        res.status(200).send(user)

    }catch(err){
        console.log(err);
    }
}

//2. get all users

const getAllUser = async (req, res)=>{
    try{
        let users = await User.findAll({})
        res.status(200).send(users);
    }
    catch(err){
        console.log(err.message); 
    }
}

//3. get one user 
const getOneUser = async (req, res)=>{
    try{
        let id = req.params.id;
        let user = await User.findOne({where: {id: id}});
        res.status(200).send(user);
    }
    catch(err){
        console.log(err.message); 
    }
}

//4. update

const updateUser = async (req, res)=>{
    try{
        let id = req.params.id;
        console.log(req.body);
        const user = await User.update(req.body, {where: {id:id}})
    
        res.status(200).send(user);
    }
    catch(err){
        console.log(err.message); 
    }
}

//5. Delete user by id

const deleteUser = async (req, res)=>{
    try{
        let id = req.params.id;
        await User.destroy({where: {id:id}})
        res.status(200).send('User is deleted');
    }
    catch(err){
        console.log(err.message); 
    }
}


//7.  connect one to many product and Reviews

const getUserProject = async (req, res)=>{
    try{
        let id = req.params.id;
        const data = await User.findOne({
            include:[{
                model: Project,
                as: 'project'
            }],
            where: {id: id}
        })
        res.status(200).send(data);
    }
    catch(err){
        console.log(err.message); 
    }
}

module.exports = {
    addUser,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser,
    getUserProject
}