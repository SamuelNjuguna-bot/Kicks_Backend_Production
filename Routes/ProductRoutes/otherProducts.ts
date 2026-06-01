import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

interface search {
  searchitem: string;
}
export const Jackets = async (req: Request, res: Response) => {
  try {
    const jacket = await prisma.products.findMany({
      where: {
        productTitle: "jacket",
      },
    });

    res.status(200).json({ jacket: jacket });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again !!!" });
  }
};

export const Shirts = async (req: Request, res: Response) => {
  try {
    const Shirts = await prisma.products.findMany({
      where: {
        productTitle: "shirt",
      },
    });

    res.status(200).json({ shirt: Shirts });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong please try again !!!" });
  }
};

export const Search = async (req: Request, res: Response) => {
  const { searchitem } = req.params as unknown as search;

  try {
    const itemfound = await prisma.products.findMany({
      where: {
        OR: [
          {
            productName: {
              search: searchitem,
            },
          },
          {
            productTitle: {
              search: searchitem,
            },
          },
          {
            category: {
              search: searchitem,
            },
          },
          {
            description: {
              search: searchitem,
            },
          },
        ],
      },
    });

    if (itemfound.length === 0) {
      res.status(204).json({ message: "Item of Search not found !!!" });
    } else {
      res.status(200).json({ item: itemfound });
    }
  } catch (e) {
    res.status(500).json({ message: "The Item Of Search Not Found !!!" });
  }
};
