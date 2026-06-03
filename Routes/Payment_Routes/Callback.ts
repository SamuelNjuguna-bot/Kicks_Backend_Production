import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import axios from "axios";
import store from "node-persist";

const userResponseUrl = "http://localhost:3000/checkpaymentstatus";
store.init();
interface token {
  token: String;
}
export const handleCompletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorCode = req.body.Body.stkCallback.ResultCode;
  const MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;

  if (errorCode !== 0) {
    const MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
    const errorCode = req.body.Body.stkCallback.ResultCode;
    await store.setItem(MerchantRequestID, `${errorCode}`);
    return;
  }
  const resultMetaData = req.body.Body.stkCallback.CallbackMetadata;
  const data = resultMetaData.Item;
  const PhoneNumber = String(data[4].Value);
  const TransactionString = data[1].Value;
  const Amount = data[0].Value;
  const { location, itemId } = req.params as unknown as any;
  try {
    const purchased = await prisma.purchasedProduct.create({
      data: {
        productId: itemId,
        TransactionString,
        PhoneNumber,
        Amount,
        Location: location,
        product: itemId,
        MerchantRequestID,
      },
    });

    if (purchased) {
      res.json("ok saf");
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Payment Complete" });
    return;
  }
};
