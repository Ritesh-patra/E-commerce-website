import htttpStatus from "http-status"
import jwt from "jsonwebtoken"

export const verifyAdmin = (req,res,next) => {
    // console.log(req.body);
    let { email, password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return next();
    }
    res.status(htttpStatus.FORBIDDEN).json({ error: "Access Denied"});
}

export const verifyTokken = (req,res,next) => {
    // console.log(req.headers.authorization); 
    let authHeader = req.headers.authorization;

    if(!authHeader) return res.status(400).json({error : "No Token"});

    let Token = authHeader.split(' ')[1];
    // console.log(Token);
    try {
        const decoded = jwt.verify(Token,process.env.JWT_SECRET);
        // console.log("decoded",decoded);
        req.user = decoded; 
        next();
    } catch (err) {
        console.log("verifyTokken",err.name);
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired, please login again" });
        }
        return res.status(401).json({ error: err.message });
    }
} 