import {Profile} from "../models/Profile.js"
import {User} from "../models/User.js"
import {uploadImageToCloudinary} from "../utils/imageUploader.js"
import {convertSecondsToDuration} from "../utils/secToDuration.js"

export const updateProfile = async(req, res) => {
    try{

        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const userId = req.user.id;
        //validation
        if(!contactNumber || !gender || !userId)
        {
            return res.status(400).json({
                success: false,
                message: "Missing Properties.",
            });
        }


        //find profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        //save the profileDetails in db
        await profileDetails.save();


        // Find the updated user details
        const updatedUserDetails = await User.findById(userId)
                            .populate("additionalDetails")
                            .exec()

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully.",
            data: updatedUserDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error While Updating Profile.",
        });
    }
}


export const deleteAccount = async (req, res) => {
    try{
        //get id
        const userId = req.user.id;
        const userDetails = await User.findById(userId);
        //validation
        if(!userDetails)
        {
            return res.status(404).json({
                success: false,
                message: "User Not Found.",
            }); 
        }


        //delete profile
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});


        //delete user
        await User.findByIdAndDelete({_id: userId});

        //return response
        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully.",
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error While Deleting Account.",
        });
    }
}


export const updateImage = async (req, res) => {
    try {
        console.log("Request received at updateImage");

        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded.",
            });
        }

        const imageFile = req.files.imageFile;
        console.log("Image file detected:", imageFile.name);

        const userID = req.user.id;

        const image = await uploadImageToCloudinary(
            imageFile,
            process.env.FOLDER_NAME || "user-profile-images",
            1000,
            1000
        );

        const updatedProfile = await User.findByIdAndUpdate(
            userID,
            { image: image.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully.",
            data: updatedProfile,
        });

    } catch (err) {
        console.error("Error in updateImage:", err);
        return res.status(500).json({
            success: false,
            message: "Error occurred while uploading image.",
        });
    }
};


//Get All Details of User
export const getAllUserDetails = async (req, res) => {
    try{
        //get id
        const userId = req.user.id;
        const userDetails = await User.findById(userId)
                                    .populate("additionalDetails")
                                    .exec()
        //validation
        if(!userDetails)
        {
            return res.status(404).json({
                success: false,
                message: "User Not Found.",
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "User Details Extracted Successfully.",
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error While Fetching User Details.",
        });
    }
}
