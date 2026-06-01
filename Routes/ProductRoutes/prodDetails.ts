import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

interface Id {
  id: string;
}
export const prodDetails = async (req: Request, res: Response) => {
  const { id }: Id = req.params as unknown as Id;
  try {
    const productDetail = await prisma.products.findFirst({
      where: {
        id,
      },
    });
    const prod = [productDetail];
    res.status(200).json({ productDetails: prod });
  } catch (e) {
    res.status(500).json({ message: "Oops,,something went wrong" });
  }
};
