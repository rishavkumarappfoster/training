const userController = require("../controllers/user.controller.js");
const projectController = require("../controllers/project.controller.js");
const authenticate = require("../utils/verifytoken.js")

//router
const router = require("express").Router()

//use route
router.post('/addUser',authenticate.verifytokens, userController.addUser)

router.get('/', authenticate.verifytokens, userController.getAllUser)


//Project url and controllers
router.post('/:id/addProject', authenticate.verifytokens, projectController.addProject)
router.get('/allProject', authenticate.verifytokens, projectController.getAllProject)

// get one to many project
router.get('/:id/projects', authenticate.verifytokens, userController.getUserProject)



router.get('/:id',authenticate.verifytokens, userController.getOneUser)

router.put('/:id', authenticate.verifytokens, userController.updateUser)

router.delete('/:id',authenticate.verifytokens, userController.deleteUser)

//routes for project
router.get('/project/:id', authenticate.verifytokens, projectController.getOneProject)

router.put('/project/:id', authenticate.verifytokens, projectController.updateProject)

router.delete('/project/:id',authenticate.verifytokens, projectController.deleteProject)


module.exports = router;

