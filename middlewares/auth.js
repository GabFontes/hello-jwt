const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ error: 'token is required' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    console.log('sem', payload);

    req.user = payload;
    console.log(req.user);
    return next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = validateToken;