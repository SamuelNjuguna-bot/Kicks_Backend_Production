import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

interface Id {
  id: string;
}

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as Id;
  try {
     await prisma.products.delete({
      where: {
        id,
      },
    });
    res.status(204).json({
      message: "Product deleted successfully",
    });
  } catch {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
