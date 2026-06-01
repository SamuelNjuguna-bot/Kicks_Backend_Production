import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../../lib/prisma.ts";
dotenv.config();
const JWTSECRETKEY: string = process.env.JWT_SECRET_KEY!;

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: "You were successfully signed in",
    });
  } catch (e) {
    res.status(500).json({
      message: " Mmmmmmmmmh Something Went Wrong !!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
    if (foundUser) {
      const isPasswordMatch = await bcrypt.compare(
        password,
        foundUser.password,
      );
      if (isPasswordMatch) {
        const payload = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };

        const token = await jwt.sign(payload, JWTSECRETKEY);
        res.status(200).cookie("usercookie", { token }).json({
          token,
        });
      } else {
        res.status(400).json({
          message: "Wrong username or password",
        });
      }
    } else {
      res.status(400).json({
        message: "Wrong username or password",
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Something Went Wrong ....",
    });
  }
};
