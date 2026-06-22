import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import store from "node-persist";

store.init();

export const checkStatus = async (req: Request, res: Response) => {
  const { MerchantRequestID } = req.body;
  const processingError = await store.getItem(MerchantRequestID);
  if (!processingError) {
    if (MerchantRequestID) {
      const completedTransaction = await prisma.purchasedProduct.findFirst({
        where: {
          MerchantRequestID,
        },
      });
      if (completedTransaction) {
        res.status(200).json([completedTransaction]);
        return;
      }
    }
  } else {
    res.status(500).json({
      message:
        "Something Went wrong while processing your request, please try again or check your mpesa balance",
    });
  }
};
