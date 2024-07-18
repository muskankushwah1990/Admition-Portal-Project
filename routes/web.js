const express = require('express')
const FrontController = require('../controllers/FrontController')
const route = express.Router()
const checkUserAuth = require('../middleware/auth')
const CourseController = require('../controllers/CourseController')
const AdminController = require('../controllers/AdminController')
const ContactController = require('../controllers/ContactController');
const adminRole =  require('../middleware/admin-role');


//frontcontroller route
route.get('/', FrontController.login)
route.get('/register', FrontController.register)
route.get('/home',checkUserAuth, FrontController.home)
route.get('/about',checkUserAuth, FrontController.about)
route.get('/contact',checkUserAuth, FrontController.contact)
route.get('/profile',checkUserAuth, FrontController.profile)
route.post('/changePassword',checkUserAuth, FrontController.changePassword)
route.post('/updateProfile',checkUserAuth, FrontController.updateProfile)

//route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset-password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)


//userinsert
route.post('/userInsert', FrontController.userinsert)
route.post('/verifyLogin', FrontController.verifyLogin)
route.get('/logout', FrontController.logout)



//course fill form
route.post('/course_insert',checkUserAuth, CourseController.courseInsert)
route.get('/courseDisplay',checkUserAuth, CourseController.courseDisplay)
route.get('/courseView/:id',checkUserAuth, CourseController.courseView)
route.get('/courseEdit/:id',checkUserAuth, CourseController.courseEdit)
route.post('/courseUpdate/:id',checkUserAuth, CourseController.courseUpdate)
route.get('/courseDelete/:id',checkUserAuth, CourseController.courseDelete)



//contact routes
route.post('/contactInsert',checkUserAuth,ContactController.contactInsert);
route.get('/contact-view',checkUserAuth,ContactController.contactView);




//admin controller
route.get('/admin/display',checkUserAuth,adminRole('admin'), AdminController.display)
route.post('/admin/updateStatus/:id',checkUserAuth,adminRole('admin'), AdminController.updateStatus)

route.get('/verify',FrontController.verifyEmail)



module.exports = route