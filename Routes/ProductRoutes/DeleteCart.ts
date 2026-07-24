import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

interface Id {
  id: string;
}
export const removeCart = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as Id;
  try {
  await prisma.cartItems.deleteMany({
      where: {
        cartId: id,
      },
    });

    res.status(204).json({ message: "item removed succussfully" });
  } catch {
    res.status(500).json({ message: "internal server Error" });
  }
};
