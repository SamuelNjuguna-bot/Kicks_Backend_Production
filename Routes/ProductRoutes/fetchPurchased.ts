import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

export const fetchPurchased = async (req: Request, res: Response) => {
  try {
    const { PhoneNumber } = req.body;
    const results = await prisma.purchasedProduct.findMany({
      include: {
        purchasedId: true,
      },
    });

    const product = results.map((prod) => {
      if (prod.PhoneNumber === PhoneNumber && prod.ResultCode==='0') {
        return prod;
      }
      return prod;
    });

    res.status(200).json([product]);
  } catch (e) {
    res.status(500).json({ message: "An Error Occurred please try again" });
  }
};
