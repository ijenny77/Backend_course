const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).send('No token, access denied')
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).send('Invalid token')
    }
    req.user = decoded 
    next()
}





module.exports = auth