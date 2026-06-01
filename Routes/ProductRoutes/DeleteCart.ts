import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

interface Id {
  id: string;
}
export const removeCart = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as Id;
  try {
    const response = await prisma.cartItems.deleteMany({
      where: {
        cartId: id,
      },
    });

    res.status(204).json({ message: "item removed succussfully" });
  } catch {
    res.status(500).json({ message: "internal server Error" });
  }
};
