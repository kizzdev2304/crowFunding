const authController = require('../controllers/authController')
const userController = require('../controllers/userControllers')

const router = require('express').Router()
const Apis = (app) => {
  router.post('/login', authController.loginController)
  router.post('/register', authController.registerController)
  //verifyTokenController trước api verify
  router.use(authController.verifyTokenController)
  router.get('/user', userController.getAllUsers)
  router.delete('/user/:id', userController.deleteUsers)
  router.post('/refresh-token', authController.refreshToken)
  router.post('/logout', authController.logoutController)
  return app.use('/', router)
}

module.exports = Apis
