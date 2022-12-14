const express = require("express")
const router = express.Router()
const userController = require('../controllers/user')
const StudentController = require("../controllers/student")
const {auth} = require("../middlewares/auth")


router.post('/register', userController.register)
router.post('/logIn', userController.loginUser)


router.post("/student/add", auth, StudentController.addStudent)
router.get("/student/view", auth, StudentController.viewStudent)
router.post("/student/edit", auth, StudentController.updateStudent)
router.delete("/student/delete", auth, StudentController.deleteStudent)

router.all("/*", function (req, res) {
    res.status(404).send({status: false,message: "Make Sure Your Endpoint is Correct !!!"})
})
module.exports = router