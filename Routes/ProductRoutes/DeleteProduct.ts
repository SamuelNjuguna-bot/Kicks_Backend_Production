import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

interface Id {
  id: string;
}

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params as unknown as Id;
  try {
    const del = await prisma.products.findFirst({
      where:{
        id
      }
    })
    if(del?.id===id){
    await prisma.products.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Product deleted successfully",
    });
    }
    else{
       res.status(500).json({
      message: "internal server error",
    });
    }

  } catch {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
