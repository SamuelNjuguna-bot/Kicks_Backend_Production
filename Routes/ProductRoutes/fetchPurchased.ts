import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

export const fetchPurchased = async (req: Request, res: Response) => {
  try {
    const { PhoneNumber } = req.body;
    const product = await prisma.purchasedProduct.findMany({
      where: { PhoneNumber },
      include: {
        purchasedId: true,
      },
    });
    res.status(200).json([product]);
  } catch (e) {
    res.status(500).json({ message: "An Error Occurred please try again" });
  }
};
