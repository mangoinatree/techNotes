const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)


router.route('/')
    .get(notesController.getAllNotes)           // read
    .post(notesController.createNewNote)          //create
    .patch(notesController.updateNote)         // update 
    .delete(notesController.deleteNote)

module.exports = router
