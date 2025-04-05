import jwt from "jsonwebtoken"
import {User} from "../models/User.js"
import dotenv from "dotenv"
dotenv.config({
    path: './env'
})

//auth
export const auth = async (req, res, next) => {
    try {
        // Extract token from cookies, body, or headers
        const token = req.cookies.token  // Fixed req.cookie -> req.cookies
                    || req.body.token
                    || req.header("Authorization")?.replace("Bearer ", "").trim();  // Fixed "Authorisation"

        // If token is missing, return error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing.",
            });
        }

        // Verify the token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Removed 'await'
            console.log("Decoded Token:", decoded);
            req.user = decoded;
            next();  // Call next() only if token is valid
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