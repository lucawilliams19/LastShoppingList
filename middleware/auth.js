const config = require('config')
const jwt = require('jsonwebtoken')


//retrieve token from front end
function auth(req, res, next) {
    //Pulls out token from payload
    const token = req.header('x-auth-token')
    
    
    //check for token
    if(!token){
        //401 error means unauthorized
       return res.status(401).json({ msg:'No token, authorization denied' })
    }

    try{
        
       
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //Add user from payload
        req.user = decoded
        next()
    }catch(e) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
    


}

module.exports = auth