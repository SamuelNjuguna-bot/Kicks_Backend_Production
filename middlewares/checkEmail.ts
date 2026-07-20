import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

interface email {
  phone: string;
}

export default async function CheckEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { phone } = req.params as unknown as email;
    const userEmail = await prisma.user.findFirst({
      where: {
        phone,
      },
    });
    if (userEmail) {
      res.status(200).json({ message: "User Email Found", userEmail });
    } else {
      res.status(500).json({ message: "The supplied email does not exist" });
    }
  } catch (e) {
    res.status(500).json({ message: "Something Went Wrong !!!" });
  }
}
