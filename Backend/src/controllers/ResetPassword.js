import {User} from "../models/User.js"
import {mailSender} from "../utils/mailSender.js"
import bcrypt from "bcrypt"

// resetPasswordToken
export const resetPasswordToken = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if the user exists
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your Email is not registered with us.",
            });
        }

        // Generate token
        const token = crypto.randomUUID();

        // Update user with token and expiration time
        await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes
            },
            { new: true }
        );

        // Create reset password URL
        const url = `http://localhost:5173/update-password/${token}` || `http://localhost:3000/update-password/${token}`;

        // Send email
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);

        return res.status(200).json({
            success: true,
            message: "Email Sent Successfully, please check email and change Password.",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset Password Mail.",
        });
    }
};


//resetPassword
export const resetPassword = async (req,res) => {
    try{

        //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) 
        {
            return res.status(401).json({
                success: false,
                message: "Password and confirmPassword did not match.",
            });
        }


        //get user details from db using token   //This is why token was inserted inside user so that using the token we can get the specific user and update its password
        const userDetails = await User.findOne({token: token});
        //if no token -> invalid token
        if(!userDetails)
        {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid.",
            });
        }
        //token time check
        if(userDetails.resetPasswordExpires < Date.now())
        {
            return res.status(401).json({
                success: false,
                message: "Token has Expired.",
            });
        }


        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //update password
        await User.findOneAndUpdate(
                                    {token: token},
                                    {password: hashedPassword},
                                    {new: true});

        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset Successfully.",
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting Password.",
        });
    }
}


