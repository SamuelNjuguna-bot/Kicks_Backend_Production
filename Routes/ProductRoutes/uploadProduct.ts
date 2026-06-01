import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

export const uploadProduct = async (req: Request, res: Response) => {
  const {
    productName,
    productTitle,
    image,
    description,
    price,
    category,
    gender,
  } = req.body;
  const productPrice = parseFloat(price);

  try {
    const uploaded = await prisma.products.create({
      data: {
        image,
        gender,
        category,
        description,
        productName,
        productTitle,
        price: productPrice,
      },
    });
    res.status(201).json({ message: " success", uploaded });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong .....",
    });
  }
};
