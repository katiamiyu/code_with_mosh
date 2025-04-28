const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('access denied, no token provided');
  const user = jwt.verify(token,'jwtprivatekey');
  if(!user) return res.status(400).send('invalid token');
  req.user = user;
  next();
};