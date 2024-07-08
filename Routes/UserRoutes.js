const express = require('express')
const userController = require('./../Controllers/userConttroler')
const router = express.Router();

router
    .route('/')
    .get(userController.getALlUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router; 