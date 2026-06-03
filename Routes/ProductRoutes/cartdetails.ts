import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
interface ID {
  id: string;
}
export const cartDetails = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as ID;
  try {
    const cartdetails = await prisma.cartItems.findMany({
      where: {
        userId: id,
      },
      include: {
        pId: true,
      },
    });
    res.status(200).json([cartdetails]);
  } catch (e) {
    res.status(500).json({ message: "An Error Occurred please try again" });
  }
};
