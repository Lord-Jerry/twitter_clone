const jwt = require('jsonwebtoken')
const users = require('../models/users.js');
const authenticate = require('../middlewares/authentication.js');
const followers = require('../models/followers.js');
class validation {
	
/**
 *checks if request body contains required keys
 *@param{array} required keys
 *@param{object} req - api request
 *@param{object} res - api response
 *@param{function} next - next middleware function
 *@return{json || undefined}
**/
  static checkBodyContains(...params) {
  	return (req,res,next) => {
      for (let p of params) {
        if (req.body[p] === undefined) {
          return res.status(401).json({
            code: 401,
  					message: `${p} is required`
          });
        }
      }
  		return next();
  	}
  }

  /**
   *checks if value of required keys are empty or null
   *@param{array} array of required keys
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkNotEmpty(...params) {
  	return (req,res,next) => {
      for (let p of params) {
        if (req.body[p] === (null || undefined || '')) {
          return res.status(401).json({
            code: 401,
  					message: `${p} cannot have empty or null value`
          });
        }
      }
  		return next();
  	}
  }

  /**
   *check if email is a valid one
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkEmailValid(req,res,next) {
  	const { email } = req.body;
  	const regex = /\w+@\w+\.\w{3}/;
  	if (regex.test(email) !== true) {
      return res.status(401).json({
        code: 401,
  			message: 'Not a valid email'
      });
  	}
  	if (email.length > 30) {
      return res.status(401).json({
        code: 401,
  			message: 'Email is too long'
  		});
  	}else if (email.length < 5) {
  		return res.status(401).json({
  			code: 401,
  			message: 'Email is too short'
  		});
  	}
  	return next();
  }

  /** TODO  
   *checks if date is a valid one
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkDateValid(req,res,next) {
  	return next();
  }

  /**NOT TESTED
   *checks names length
   *@param{array} array of name keys
   *@param{object} req - api request 
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checknameLength(...params) {
    return (req,res,next) => {
      for (let p of params) {
        if (req.body[p].length > 20) {
          return res.status(401).json({
            code: 401,
  					message: `Value of ${p} field exceeded max length`
          });
        }
      }
      return next();
  	}
  }

  /**Not working yet
   *checks if username is valid
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkUserValid(req,res,next) {
  	const regex = /[A-Za-z1-9_-]/;
  	const {user_name} = req.body;
  	if (regex.test(user_name) !== true) {
      return res.status(401).json({
        code: 401,
  			message: 'Invalid user name',
  		});
  	}
  	return next();
  }



  /**
   *checks length of password
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *return{json || undefined}
  **/
  static checkPasswordLength(req,res,next) {
  	const { password } = req.body;
  	if (password.length > 30) {
      return res.status(401).json({
        code: 401,
  			message: 'Password is too long'
      });
  	}else if (password.length < 6) {
      return res.status(401).json({
        code: 401,
        message: 'Password is too short'
      });
  	}
  	return next();
  }

  /**
   *checks if user id is a valid one
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{fucton} next - next middleware function
   *@return{json || undefined}
  **/ 
  static checkUserIdLength(req,res,next) {
    if (req.params.id.length !== 24) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid User Id'
      });
    }
    return next();
  }


  /**
   *compares password's
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static compareValues(req,res,next) {
    const {password} = req.body;
 	  const {password2} = req.body;	
    if (password !== password2) {
      return res.status(401).json({
        code: 401,
        message: 'Passwords do not match'
      });
    }
    return next(); 
  }

  /**
   *check if email exists in database
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkEmailExist(req,res,next) {
  	users.findOne({
  		email: req.body.email,
  	})
  	.then(result => {
  		if (result) {
  			return res.status(401).json({
  				code: 401,
  				message: 'Email already exists'
  			});
  		}
  		return next();
  	})
  	.catch(err => {
      return res.status(500).json({
        code: 500,
  			message: err
  		});
  	});
  }

  /**
   *checks if user id exists
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{fuction} next - next middleware function
   *@return{json || undefined}
  **/
  static checkUserIdExists(req,res,next) {
    users.findOne({
      _id: req.params.id
    }).then(data => {
      if (!data) {
        return res.status(404).json({
          code: 404,
          message: 'User does not exist'
        });
      }
      return next();
    }).catch(err => {
      return res.status(500).json({
        code: 500,
        message: err
      });
    });
  }

  /** 
   *check if user name exist in database
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *return{json || undefined}
  **/
  static checkUserExist(req,res,next) {
  	users.findOne({
  		'name.user': req.body.user_name,
  	}).then(result => {
      if (result) {
        return res.status(401).json({
          code: 401,
  				message: 'Username already exists'
  			});
  		}
  		return next();
  	}).catch(err => {
      return res.status(500).json({
        code: 500,
  			message: err
  		});
  	});
  } 

  /**
   *checks if user is already following the user he/she intends to follow
   *@param{object} req - api request
   *@param{object} res - api response
   *@param{function} next - next middleware function
   *@return{json || undefined}
  **/
  static checkFollow(req,res,next) {

    const token = authenticate.returnDecoded(req.headers.token);
    if (token === false) {
      return res.status(400).json({
        code: 401,
        message: 'Invalid token'
      });
    }
    //find user
    followers.findOne({
      'following.id': req.params.id,
      'follower.id': token.id
    }).then(data => {
      if(data) {
        return res.status(401).json({
          code: 401,
          message: 'You are already following this users'
        });
      } 
      return next();
    })
  }

}
module.exports = validation;