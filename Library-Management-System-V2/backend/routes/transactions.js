import express from "express";
import Book from "../models/Book.js";
import BookTransaction from "../models/BookTransaction.js";

const router = express.Router();

// Tạo giao dịch mượn sách
router.post("/add-transaction", async (req, res) => {
    try {
        if (req.body.isAdmin === true) {
            const newtransaction = new BookTransaction({
                bookId: req.body.bookId,
                borrowerId: req.body.borrowerId,
                bookName: req.body.bookName,
                borrowerName: req.body.borrowerName,
                transactionType: req.body.transactionType,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate
            });
            const transaction = await newtransaction.save();
            const book = await Book.findById(req.body.bookId);
            await book.updateOne({ $push: { transactions: transaction._id } });
            res.status(200).json(transaction);
        } else {
            res.status(403).json("You are not allowed to add a Transaction");
        }
    } catch (err) {
        res.status(504).json(err);
    }
});

// Lấy tất cả giao dịch
router.get("/all-transactions", async (req, res) => {
    try {
        const transactions = await BookTransaction.find({}).sort({ _id: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(504).json(err);
    }
});

// ✅ Sửa giao dịch (trả sách) — chỉ cập nhật returnDate và transactionStatus
router.put("/update-transaction/:id", async (req, res) => {
    try {
        if (req.body.isAdmin) {
            const updateFields = {
                returnDate: req.body.returnDate,
                transactionStatus: "Returned"
            };

            await BookTransaction.findByIdAndUpdate(req.params.id, {
                $set: updateFields,
            });

            res.status(200).json("Transaction marked as returned successfully");
        } else {
            res.status(403).json("You are not authorized to update the transaction");
        }
    } catch (err) {
        res.status(504).json(err);
    }
});

// Xóa giao dịch
router.delete("/remove-transaction/:id", async (req, res) => {
    if (req.body.isAdmin) {
        try {
            const data = await BookTransaction.findByIdAndDelete(req.params.id);
            const book = await Book.findById(data.bookId);
            await book.updateOne({ $pull: { transactions: req.params.id } });
            res.status(200).json("Transaction deleted successfully");
        } catch (err) {
            res.status(504).json(err);
        }
    } else {
        res.status(403).json("You don't have permission to delete a transaction!");
    }
});

export default router;
