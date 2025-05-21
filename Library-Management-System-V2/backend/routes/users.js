import express from "express";
import User from "../models/User.js";

const router = express.Router()

/* Getting user by id */
router.get("/getuser/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("activeTransactions").populate("prevTransactions")
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } 
    catch (err) {
        return res.status(500).json(err);
    }
})

/* Getting all members in the library */
router.get("/allmembers", async (req,res)=>{
    try{
        const users = await User.find({}).populate("activeTransactions").populate("prevTransactions").sort({_id:-1})
        res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json(err);
    }
})
/* Update user by id */
router.put("/updateuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const updateFields = {};

            // Chỉ cập nhật những trường cho phép
            if (req.body.points !== undefined) updateFields.points = req.body.points;
            if (req.body.userFullName) updateFields.userFullName = req.body.userFullName;
            if (req.body.email) updateFields.email = req.body.email;
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                updateFields.password = await bcrypt.hash(req.body.password, salt);
            }

            // KHÔNG cho phép cập nhật userType hoặc isAdmin
            delete req.body.userType;
            delete req.body.isAdmin;

            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: updateFields,
            });

            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

/* Adding transaction to active transactions list */
router.put("/:id/move-to-activetransactions" , async (req,res)=>{
    if(req.body.isAdmin){
        try{
            const user = await User.findById(req.body.userId);
            await user.updateOne({$push:{activeTransactions:req.params.id}})
            res.status(200).json("Added to Active Transaction")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("Only Admin can add a transaction")
    }
})

/* Adding transaction to previous transactions list and removing from active transactions list */
router.put("/:id/move-to-prevtransactions", async (req,res)=>{
    if(req.body.isAdmin){
        try{
            const user = await User.findById(req.body.userId);
            await user.updateOne({$pull:{activeTransactions:req.params.id}})
            await user.updateOne({$push:{prevTransactions:req.params.id}})
            res.status(200).json("Added to Prev transaction Transaction")
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(403).json("Only Admin can do this")
    }
})

/* Delete user by id */
router.delete("/deleteuser/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
})

export default router