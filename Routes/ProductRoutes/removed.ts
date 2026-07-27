import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
interface acqId {
  acquiredId: string;
}

export const Remove= async (req: Request, res: Response) => {
  const { acquiredId } = req.body as unknown as acqId;
  try {
    const cleared = await prisma.purchasedProduct.updateMany({
      where: {
     acquiredId
      },
      data:{
        isDeleted:true
      }
    });
    res.status(200).json({ message: "Everything was okay ....", cleared });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong..." });
  }
};
