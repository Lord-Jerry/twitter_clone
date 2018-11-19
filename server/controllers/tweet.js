const jwt = require('jsonwebtoken');
const tweets = require('../models/tweets.js');
const users = require('../models/users.js')
class tweet {

	/**
	 *inserts tweet to database
	 *@param{object} req - api request
	 *@param{object} res - api response
	 *@return{json}
	**/
	static createTweet(req,res) {
		const token = jwt.verify(req.headers.token,process.env.SECRET_KEY,(err,decoded)=>{
			if (err) {
        return res.status(401).json({
          code: 401,
          message: 'invalid token'
        });
			}
			if (decoded) {
        const {username,displayName,id} = decoded;
				const post = new tweets({
          tweet: req.body.tweet,
          user: {
            id,
            username,
            displayName
          },
          retweets: false
        }).save((err,result) => {
          if (err) {
            return res.status(400).json({
              code: 400,
			    		message: 'Could not post tweet'
            });
          }
          if (result) {
            return res.status(200).json({
              code: 200,
			    		message: result
            });
          }
        }) 
      }
    })		
  }

	/**
	 *find and replace mentions 
	 *@param{object} req - api request
	 *@param{object} res - api response
	 *@param{function} next - next middleware function
	 *@return{undefined}
	**/
	static getMentions(req,res,next) {
		return new Promise((resolve,reject)=>{
			const regex = /@\w+/g;
			const arr = req.body.tweet.match(regex);
			arr.forEach(data=>{
        const temp = data.slice(1);
				users.findOne({
          'name.user': temp
				}).then(result=>{
          arr.pop();
					if (result) {
            req.body.tweet = req.body.tweet.replace(data,()=>{
              return `<a href="/api/v1/users/${result.id}">${data}</a>`;
					  });
          }
        });
      });
      setInterval(()=>{
        if (arr.length == 0) resolve();
      },100);
    }).then(() => next());
  }

}
module.exports = tweet;