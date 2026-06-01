import jwt from "jsonwebtoken";
const password = process.env.JWT_SECRET_KEY!;
import type { Request, Response } from "express";

function getId(req: Request, res: Response) {
  console.log(req.body);

  // if(token){
  //   jwt.verify(
  //   token,
  //   password,
  //   (error:any, data:any) => {
  //     if (data) {
  //       const {id} = data
  //       res.status(200).json({id})
  //     }
  //     if (error) {
  //       res.status(500).json({
  //         message: "Somethin went wrong please try again later",
  //       });
  //     }
  //   },
  // );
  // }
}

export default getId;
