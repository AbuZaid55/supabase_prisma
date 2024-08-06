import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.SUPABASE_JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({success:false,message:err.message});
            }
            req.user = user;
            next();
        });
    } else {
        res.status(400).json({success:false,message:"Unauthorized User"}); 
    }
};

export default auth;