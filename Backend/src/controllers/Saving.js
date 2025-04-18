import { Saving } from "../models/Saving";

export const createSavingGoals = async (req,res)=>{
    try{
       const { title ,goalAmount } = req.body();
       const userId = req.user.id;
       if(!title || !goalAmount){
        return res.status(400).json({success : false,message : "All fields are required "});
       }
       const newSaving = await Saving.create({user : userId,title,goalAmount});
       res.status(201).json({success : true,saving: newSaving});

    }catch(error){
        console.error("Error creating the saving goal : ",error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllSavingForUser = async(req,res)=>{
    try{
        const userId = req.user.id;
        const savings = await Saving.find({user : userId});
        res.status(201).json({success : true,savings});
    }catch(error){
        console.error("Error fetching savings:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateSavingGoal = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, goalAmount, savedAmount } = req.body;
  
      const updatedSaving = await Saving.findByIdAndUpdate(
        id,
        { title, goalAmount, savedAmount },
        { new: true }
      );
  
      if (!updatedSaving) {
        return res.status(404).json({ success: false, message: "Saving not found" });
      }
  
      res.status(200).json({ success: true, saving: updatedSaving });
    } catch (err) {
      console.error("Error updating saving goal:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // Delete a saving goal
export const deleteSavingGoal = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedSaving = await Saving.findByIdAndDelete(id);
  
      if (!deletedSaving) {
        return res.status(404).json({ success: false, message: "Saving not found" });
      }
  
      res.status(200).json({ success: true, message: "Saving deleted successfully" });
    } catch (err) {
      console.error("Error deleting saving goal:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // Add to saved amount
export const addToSaving = async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body;
  
      const saving = await Saving.findById(id);
  
      if (!saving) {
        return res.status(404).json({ success: false, message: "Saving not found" });
      }
  
      saving.savedAmount += amount;
      await saving.save();
  
      res.status(200).json({ success: true, saving });
    } catch (err) {
      console.error("Error adding to saving:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  // sub to saved amount
export const subToSaving = async (req, res) => {
    try {
      const { id } = req.params;
      const { amount } = req.body;
  
      const saving = await Saving.findById(id);
  
      if (!saving) {
        return res.status(404).json({ success: false, message: "Saving not found" });
      }
  
      saving.savedAmount -= amount;
      if(saving.savedAmount<0) saving.savedAmount = 0;
      await saving.save();
  
      res.status(200).json({ success: true, saving });
    } catch (err) {
      console.error("Error adding to saving:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
