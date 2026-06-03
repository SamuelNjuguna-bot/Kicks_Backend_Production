import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const viewProducts = async (req: Request, res: Response) => {
  try {
    const shoes = await prisma.products.findMany({
      where: {
        productTitle: "shoe",
      },
    });
    res.status(200).json([shoes]);
  } catch (e) {
    res.status(500).json({
      message: "Something Went Wrong Please Try Again",
    });
  }
};
