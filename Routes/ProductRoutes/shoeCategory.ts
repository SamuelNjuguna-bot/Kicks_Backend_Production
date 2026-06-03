import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const menShoes = async (req: Request, res: Response) => {
  try {
    const menShoes = await prisma.products.findMany({
      where: {
        AND: {
          productTitle: "shoe",
          gender: "male",
        },
      },
    });
    res.status(200).json({ shoe: menShoes });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again !!!" });
  }
};

export const womenShoes = async (req: Request, res: Response) => {
  try {
    const menShoes = await prisma.products.findMany({
      where: {
        AND: {
          productTitle: "shoe",
          gender: "female",
        },
      },
    });

    res.status(200).json({ shoe: menShoes });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again !!!" });
  }
};
