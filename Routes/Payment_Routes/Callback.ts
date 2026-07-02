import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import axios from "axios";
export const handleCompletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const ResultCode = String(req.body.Body.stkCallback.ResultCode);
  const MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const resultMetaData = req.body.Body.stkCallback.CallbackMetadata;
  const dat = resultMetaData.Item;
  const PhoneNumber = String(dat[4].Value);
  const TransactionString = dat[1].Value;
  const Amount = dat[0].Value;
  const { location, itemId } = req.params as unknown as any;
  if (ResultCode!=="0") {
    return;
  }
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
        ResultCode
      },
      })
    if (purchased) {
      res.json("ok saf");
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Payment Complete" });
    return;
  }
};
