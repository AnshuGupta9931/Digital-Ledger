import {Categories} from "../models/Categories.js";
import {Profile} from "../models/Profile.js";
import {User} from "../models/User.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user?.id;

        if (!name || !userId) {
            return res.status(400).json({
                success: false,
                message: "Name and User ID are required.",
            });
        }

        const categoryDetails = await Categories.create({
            user: userId,
            name,
            totalSpent: 0,
        });

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully.",
            category: categoryDetails,
        });

    } catch (err) {
        console.error("Error creating category:", err);
        return res.status(500).json({
            success: false,
            message: "Error while creating category.",
        });
    }
};

export const showAllCategory = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. User ID missing.",
            });
        }

        const categories = await Categories.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: categories.length === 0 ? "No categories found." : "Categories fetched successfully.",
            categories: categories,
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching categories.",
        });
    }
};
