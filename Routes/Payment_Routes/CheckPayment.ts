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
  if(code =="0"){
            res.status(200).json([completedTransaction]);
  }
 else if(code=="1"){
        res.status(500).json({
      message:
        "Insufficient balance please try again later",
    });
  }
  else if(code=="26"){
        res.status(500).json({
      message:
        "System Busy, please try again later",
    });}
  else if(code=="1001"){
        res.status(500).json({
      message:
        "Simmilar transaction has taken place please try again",
    });}
  else if(code=="1019"){
        res.status(500).json({
      message:
        "Transaction expired , please try again",
    });
  }
  else if(code=="1025"){
        res.status(500).json({
      message:
        "Error occured while sending stk push , please try again",
    });
  }
  else if(code=="1032"){
        res.status(500).json({
      message:
        "request cancelled !!",
    });
  }
    else if(code=="1037"){
        res.status(500).json({
      message:
        "Kindly try again , we could'nt reach the number.",
    });}
      else if(code=="2001"){
        res.status(500).json({
      message:
        "Wrong pin !",
    });}

  else{
    res.status(500).json({
      message:
        "Internal error !!",
    });
  }

};
