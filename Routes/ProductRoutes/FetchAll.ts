import { prisma } from "../../lib/prisma.ts";
import type { Request, Response } from "express";

export const fetchAll = async (req: Request, res: Response) => {
  try {
    const Products = await prisma.products.findMany({});
    const product = [Products];
    res.status(200).json({ product });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};
