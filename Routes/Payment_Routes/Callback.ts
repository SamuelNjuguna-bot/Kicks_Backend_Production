import type { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import strict from "node:assert/strict";
export const handleCompletePayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {



  interface params{
    location :string,
    itemId:string
  }
  try {
  const ResultCode = String(req.body.Body.stkCallback.ResultCode);
  const MerchantRequestID = req.body.Body.stkCallback.MerchantRequestID;
  const { location, itemId }  = req.params as unknown as params
  if(ResultCode==="0"){
  const resultMetaData = req.body.Body.stkCallback.CallbackMetadata;
  const data = resultMetaData.Item;
  const PhoneNumber = String(data[4].Value);
  const TransactionString = data[1].Value as string;
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
 await prisma.cartItems.update({
  where:{
    productId:itemId
  },
  data:{
    viewCart:false
  }
 })

 if (purchased) {
      res.json("ok saf");
      return;
    }

  }
  else{
    const notPurchased = await prisma.purchasedProduct.create({
      data:{
        ResultCode,
        MerchantRequestID,
        product:itemId
      }
    })
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
