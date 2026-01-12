import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  // console.log("AdminAuth");
  // console.log(req.headers);
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);

    if(!authHeader) return res.status(400).json({error : "No Token"});

    const token = authHeader.split(' ')[1];
    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, Login Again' });
    }

    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded_token);
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: 'Not authorized, Login Again' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export default adminAuth;