const jwt = require('jsonwebtoken');
class authentication {

	/**
	 *checks to see if client token is valid
	 *@param{object} req - api request
	 *@param{object} res - api response
	 *@param{function} next - next middleware function
	 *@return{undefined || redirect_user}
	**/
 static verifyToken(req,res,next) {
	if (req.body.token) {
		 jwt.verify(req.body.token,process.env.SECRET_KEY,(err,decoded) => {
			 if(err) return next();

			 if(decoded) return res.redirect('/api/v1/');
		 });
		
	} else {
		 return next()
}
 }

 /**
  *
  *
 **/
 static verifyOperation(req,res,next) {
 	if (req.body.token) {
 		jwt.verify(req.body.token,process.env.SECRET_KEY,(err,decoded) => {
 			if (err) return res.redirect('/api/v1/login');

 			if (decoded) return next();
 		});
 	} else {
 		return res.redirect('/api/v1/login');
 	}
 }

 /**
  *
  
  *
 **/
 static decodeToken(token) {
 	jwt.verify(req.headers.token,process.env.SECRET_KEY,(err,decoded) => {
			 if(err) return res.status(401).json({
			 	message: 'invalid token'
			 });

			 if(decoded) return res.redirect('/api/v1/');
		 });
 }
  /**
   *
   *
  **/
  static returnDecoded(token) {
    const decode = jwt.verify(token,process.env.SECRET_KEY,
      (err,decoded) => {
        if(err) return false;
        if(decoded) return decoded;
      });
    return decode
  }

}
module.exports = authentication;