import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
export const handleCompletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {
  const ResultCode = String(req.body.Body.stkCallback.ResultCode);
  const MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const { location, itemId } = req.params as unknown as any;
  if(ResultCode==="0"){
  const resultMetaData = req.body.Body.stkCallback.CallbackMetadata;
  const data = resultMetaData.Item;
  const PhoneNumber = String(data[4].Value);
  const TransactionString = data[1].Value;
  const Amount = data[0].Value;
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

  }
  else{
    console.log(ResultCode)
    const notPurchased = await prisma.purchasedProduct.create({
      data:{
        ResultCode,
        MerchantRequestID,
        product:itemId
      }
    })
    console.log(notPurchased)
    if (notPurchased) {
      res.json("ok saf");
      return;
    }
  }

  
  } catch (error) {
    res.status(500).json({ message: "Payment Not Complete" });
    return;
  }
};
