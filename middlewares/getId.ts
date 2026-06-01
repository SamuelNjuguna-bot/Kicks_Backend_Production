import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const password = process.env.JWT_SECRET_KEY!;
import type { Request, Response, NextFunction } from "express";

function verify(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;

  if (token) {
    jwt.verify(token.token, password, (error: any, data: any) => {
      if (data) {
        const { id } = data;
        const { Size, Total, prodId, color } = req.body;
        req.body = { Size, Total, prodId, color, id };
        next();
      }
      if (error) {
        res.status(500).json({
          message: "Something went wrong please try again later",
        });
      }
    });
  } else {
    res.status(500).json({
      message: "Something went wrong please try again later",
    });
  }
}

export default verify;
