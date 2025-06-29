import jwt from "jsonwebtoken"
import { Types } from "mongoose"
import User from '../models/userModel.js';
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("")[1]
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }


      const decoded = jwt.verify(token, process.env.JWT_SECRET)  
      // if (!Types.ObjectId.isValid(decoded.id)) {
      //   return res.status(401).json({ message: "Unauthorized" })
      // }
      // req.user = { id: decoded.id }

    req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
   next()

    } catch (error) {
         res.status(401).json({ message: "Unauthorized" })
    }
}

 export default authMiddleware;

