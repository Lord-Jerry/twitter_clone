const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authentication.js');
const users = require('../models/users.js');
const followers = require('../models/followers.js');
class user {

	/**
	 *creates user account
	 *@param{object} req - api request
	 *@param{object} res - api response
	 *@return{json} user details || error message
	 **/
	 static createUser(req,res) {
		const password = bcrypt.hashSync(req.body.password,10);
		const data = new users({
			name: {
				first: req.body.first_name,
				last: req.body.last_name,
				middle: req.body.middle_name,
				user: req.body.user_name,
				display: req.body.display_name,
			},
			email: req.body.email,
			password,
			bio: req.body.bio,
			sex: req.body.sex,
		})
		.save()
		.then(data=>{
			if(!data) {
				return res.status(401).json({
					code: 401,
					message: 'An error occured',
				});
			}
			const token = jwt.sign(
					{id: data.id,
					 username: data.name.user,
					 displayName: data.name.display},
					 process.env.SECRET_KEY,
					 { expiresIn: '30d'});
			const user = data;
			user.password = undefined;
			return res.status(200).json({
				code: 200,
				message: user,
				token, 
			});
		})
		.catch(err=>{
				return res.status(500).json({
					code: 500,
					message: 'internal server error'
				});
		})
	}

	 /**
	  *logs in user
	  *@param{object} req - api request
	  *@param{object} res - api response 
	  *@return{json} user token or error message
	 **/
	 static loginUser(req,res) {
	 	users.findOne({
	 		email: req.body.email,
	 	})
	 	.then(result => {
	 		if (!result) {
	 			return res.status(401).json({
	 				code: 401,
	 				message: 'Wrong User Name Or Password'
	 			});
	 		} else {
	 				bcrypt.compare(req.body.password,result.password).then(pass=> {
	 					if (!pass) {
	 						return res.status(401).json({
	 							code: 401,
	 							message: 'Wrong User Name Or Password'
	 						})
	 					}else {
	 						const token = jwt.sign(
	 							{id: result.id,
	 								username: result.name.user,
					        displayName: result.name.display
					      },
	 							process.env.SECRET_KEY,
	 							{expiresIn: '30d'});
	 						return res.status(200).json({
	 							code: 200,
	 							token,
	 							result
	 						});
	 					}
	 				})
	 			}
	 	})
	 	.catch(err => {
	 		return res.status(500).json({
	 			code: 500,
	 			message: err
	 		});
	 	});
	 }
	 /** 
	  *get profile of user with submitted id
	  *@param{object} req - api request
	  *@param{object} res - api response
	  *@returns {json} 	user profile || error message
	 **/
	 static getUserProfile(req,res) {
	 	users.findOne({
	 		id: req.params.id
	 	}).then(data=>{
	 		if (!data) {
	 			return res.status(404).json({
	 				code: 404,
	 			  message: 'User not found'
	 			})
	 		}
	 		const user = data;
	 		user.password = undefined;
	 		return res.status(200).json({
	 			code: 200,
	 			message: user,
	 		});
	 	})
	 }

	 /**
	  *Follow user
	  *
	 **/
	 static followUser(req,res,next) {
	 	//decode token
	 	const token = authenticate.returnDecoded(req.headers.token);
	 	
	 	const following = users.findOne({
	 		_id: req.params.id
	 	});
	 	
	 	const follower = users.findOne({
	 		_id: token.id
	 	});
	  Promise.all([following,follower])
	  .then(result =>{
	  	const status = user.saveFollow(result[0],result[1]);
	  	status.then(data => {
	  		if(!data) {
	  			return res.status(401).json({
	  				code: 401,
	  				message: 'error occured'
	  			});
	  			
	  		}
	  		return res.status(200).json({
	  			code: 200,
	  			message: 'Followed user successfully'
	  		});
	  	});
	  });
	}

	 /**
	  *
	  *
	 **/
	 static saveFollow(followed,follower) {
	 	return new followers({
	    following: {
	    	id: followed._id,
	 			name: {
	 				user: followed.name.user,
	 				display: followed.name.display
	 			},
	 			avatar: followed.picture.profile,
	 			},
	 		  follower: {
	 		  	id: follower._id,
	 		  	name: {
	 		  		user: follower.name.user,
	 		  		display: follower.name.display
	 		  	},
	 		  	avatar: follower.picture.profile
	 		  }
	 		}).save()
	 	}

	 
	 	
}
module.exports = user