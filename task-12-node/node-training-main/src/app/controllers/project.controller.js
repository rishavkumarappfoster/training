const db = require("../models");

//create main model
const Project = db.projects


//main work 

//1.  create Project

const addProject = async (req, res)=>{
    try{
        const id = req.params.id;
        let info = {
            user_id: id,
            name: req.body.name
        }
        const project = await Project.create(info)
        res.status(200).send(project)

    }catch(err){
        console.log(err);
    }
}

//getallproject
const getAllProject = async (req, res) => {
    const projects = await Project.findAll({});
    res.status(200).send(projects)
}


//2. get one project 
const getOneProject = async (req, res)=>{
    try{
        let id = req.params.id;
        let project = await Project.findOne({where: {id: id}});
        res.status(200).send(project);
    }
    catch(err){
        console.log(err.message); 
    }
}

//3. update

const updateProject = async (req, res)=>{
    try{
        let id = req.params.id;
        const project = await Project.update(req.body, {where: {id:id}})
    
        res.status(200).send(project);
    }
    catch(err){
        console.log(err.message); 
    }
}

//4. Delete user by id

const deleteProject = async (req, res)=>{
    try{
        let id = req.params.id;
        await Project.destory({where: {id:id}})
        res.status(200).send("Project is deleted");
    }
    catch(err){
        console.log(err.message); 
    }
}



module.exports = {
    addProject,
    getAllProject,
    getOneProject,
    updateProject,
    deleteProject
}