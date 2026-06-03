import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const cartItem = async (req: Request, res: Response) => {
  try {
    const { Size, Total, prodId, color, id } = req.body;
    const product = await prisma.products.findFirst({
      where: {
        id: prodId,
      },
    });

    const price = product?.price;
    const total = () => {
      if (price != undefined) {
        const newtotal = Total * price;
        return newtotal;
      }
    };
    const newtotal = total()!;
    const mycart = await prisma.cartItems.create({
      data: {
        productId: prodId,
        total_Amount: newtotal,
        size: Size,
        color,
        userId: id,
        Quantity: Total,
      },
    });
    const userId = mycart.userId;
    res.status(201).json({ userId, Total });
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
};
