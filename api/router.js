const express = require('express')
const router = express.Router();

router.use('/air',require('./modules/air/AirRoute'));
router.use('/utils',require('./modules/utils/UtilsRoute'));


module.exports = router