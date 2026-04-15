// JSON WEB TOKEN
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_TOKEN;
console.log("ahaskldfjklasdj");
console.log("ahaskldfjklasdj");
console.log("ahaskldfjklasdj");
console.log("ahaskldfjklasdj");
console.log("ahaskldfjklasdj");
console.log(secret);
const generateAccessToken = (userPayload) => {
  return jwt.sign(
    userPayload, 
    secret, 
    { expiresIn: '1h' },
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, secret);
};


module.exports = {
  generateAccessToken,
  verifyAccessToken,
};