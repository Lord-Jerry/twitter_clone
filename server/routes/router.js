const express = require('express');
const validation = require('../middlewares/validation.js');
const authenticate = require('../middlewares/authentication.js');
const user = require('../controllers/users.js');
const tweet = require('../controllers/tweet.js')
const dbConn = require('../config/db.config.js');

//set up express router
const router = express.Router();

/** ************************ API ENDPOINTS ******************** **/

//SIGNUP ROUTE
router.route('/api/v1/signup')
  .post(authenticate.verifyToken,
  	    validation.checkBodyContains('first_name','last_name','middle_name','user_name','password','display_name','email','sex','d.o.b'),
  	    validation.checkNotEmpty('first_name','last_name','user_name','password','display_name','email','sex','d.o.b'),
  	    validation.checkEmailValid,
  	    validation.checkUserValid,
  	    validation.checkEmailExist,
  	    validation.checkUserExist,
  	    user.createUser,
  	);

  //LOGIN ROUTE
  router.route('/api/v1/login')
    .post(authenticate.verifyToken,
    	    validation.checkBodyContains('email','password'),
        	validation.checkNotEmpty('email','password'),
    	    validation.checkEmailValid,
    	    user.loginUser,
    	  );

  router.route('/api/v1/tweet')
    .post(tweet.getMentions,
    	    tweet.createTweet);
    //HOME PAGE ROUTE
  router.route('/api/v1/')
    .get((req,res)=>{
    	res.json({hey:'helo'})
    });

  router.route(`/api/v1/follow/:id`)
    .get(validation.checkUserIdLength,
    	validation.checkUserIdExists,
    	validation.checkFollow,
    	user.followUser);


//404 ROUTE
router.route('*')
  .all((req,res) => {
    res.status(404).json({
    	 code: 404,
    	 message: 'Invalid route'
    });
  });


  module.exports = router;