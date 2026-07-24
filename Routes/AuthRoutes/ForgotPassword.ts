import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export default async function ForgotPassword(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const changedPassword = await prisma.user.update({
      where: {
        phone,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "success", changedPassword });
  } catch {
    res.status(500).json({ message: "Something Went Wrong !!!" });
  }
}
