import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token  
                    || req.body.token
                    || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing.",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired.",
            });
        }

    } catch (err) {
        console.error("Auth Middleware Error:", err.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token.",
        });
    }
};
