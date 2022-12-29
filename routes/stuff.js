const express = require('express')
const stuffCtrl = require('../controllers/stuff')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const router = express.Router()

router.get('/', auth, stuffCtrl.getThing)
router.get('/all-thing/:id', auth, stuffCtrl.getThingById)
router.put('/update-thing/:id', auth, stuffCtrl.updateThings)
router.delete('/delete-thing/:id', auth, stuffCtrl.deleteThings)
router.post('/post', auth, multer, stuffCtrl.createThings)

module.exports = router