const userController = require("../controllers/user.controller.js");
const projectController = require("../controllers/project.controller.js");

//router
const router = require("express").Router()

//use route
router.post('/addUser', userController.addUser)

router.get('/', userController.getAllUser)


//Project url and controllers
router.post('/:id/addProject', projectController.addProject)
router.get('/allProject', projectController.getAllProject)

// get one to many project
router.get('/:id/projects', userController.getUserProject)



router.get('/:id', userController.getOneUser)

router.put('/:id', userController.updateUser)

router.delete('/:id', userController.deleteUser)

//routes for project
router.get('/project/:id', projectController.getOneProject)

router.put('/project/:id', projectController.updateProject)

router.delete('/project/:id', projectController.deleteProject)

module.exports = router;

