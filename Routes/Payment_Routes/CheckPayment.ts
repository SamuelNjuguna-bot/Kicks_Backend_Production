import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";


export const checkStatus = async (req: Request, res: Response) => {
  const { MerchantID } = req.body;
  const completedTransaction = await prisma.purchasedProduct.findFirst({
      where:{
        MerchantRequestID:MerchantID
      }
    })
  const code =completedTransaction?.ResultCode
 
  if(code!=="0"){
        res.status(500).json({
      message:
        "Something Went wrong while processing your request, please try again or check your mpesa balance",
    });
  }
  else{
            res.status(200).json([completedTransaction]);

  }

};
