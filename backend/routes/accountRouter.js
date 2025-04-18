import express, { Router } from "express";
const accountRouter = express.Router();
import { z } from "zod";
import { User , Account} from "../models/db.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/userMiddleware.js";
import mongoose  from "mongoose";
accountRouter.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Account.findOne({
      userId: req.userId,
    });
    res.json({
      balance: account.balance,
    });
  } catch (err) {

    console.log(err)
    res.status(401).json({ msg: "something went wrong in the server" });
  }
});
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    console.log(toAccount)

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

export default accountRouter;

