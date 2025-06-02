import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        console.log("Uploading Image:", file.name);
        console.log("Temp File Path:", file.tempFilePath);

        const options = {
            folder,
            resource_type: "auto"
        };

        if (height) options.height = height;
        if (quality) options.quality = quality;

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Cloudinary Upload Success:", result);

        fs.unlinkSync(file.tempFilePath); // Clean up temp file

        return result;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};
