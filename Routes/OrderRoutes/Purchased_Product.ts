import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
export const AllPurchasedProducts = async (req: Request, res: Response) => {
  try {
    const All = await prisma.purchasedProduct.findMany({
      include: {
        purchasedId: true,
      },
    });
    const AllPurchases = All.filter((prod) => {
      return( prod.PhoneNumber && prod.ResultCode === "0" && prod.isDeleted === false && prod.isAdminDeleted===false)
    });

    res.status(200).json([AllPurchases]);
  } catch {
    res.status(200).json({
      message: "something went wrong please try again later",
    });
  }
};
