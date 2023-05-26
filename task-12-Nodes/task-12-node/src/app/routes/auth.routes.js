const authController = require("../controllers/auth.controller.js");
const authenticate = require("../utils/verifytoken.js")


//router
const router = require("express").Router()

router.post('/register', authenticate.validateUser, authController.register)

router.post('/login', authController.login)

router.get('/', authController.showalluser)

router.get("/logout", authenticate.verifytokens, (req, res)=>{
	  res.clearCookie("access_token");
      res.status(200).send("user successfully logout")
})

module.exports = router;