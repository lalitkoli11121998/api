var express = require('express');
var router = express.Router();
 var usercontrollers = require('../controllers/user_controller');


 router.use('/user', usercontrollers);

router.get('/', function (req, res) {
    return res.json({
        messsage: 'Home page h'
    })

})



module.exports = router;