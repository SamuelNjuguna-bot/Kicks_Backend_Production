import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";
export const AllPurchasedProducts = async (req: Request, res: Response) => {
  try {
    const AllPurchases = await prisma.purchasedProduct.findMany({
      include: {
        purchasedId: true,
      },
    });

    res.status(200).json([AllPurchases]);
  } catch {
    res.status(200).json({
      message: "something went wrong please try again later",
    });
  }
};
