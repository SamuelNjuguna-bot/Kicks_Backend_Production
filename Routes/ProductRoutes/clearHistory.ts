import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";


interface PhonNo {
    getPhonNo:string 
}

export const ClearHistory = async (req: Request, res: Response) => {

const {getPhonNo} = req.body as unknown as PhonNo 


const cleared = await prisma.purchasedProduct.deleteMany({
    where:{
        PhoneNumber:getPhonNo
    }
})
res.status(200).json({message :"Everything was okay ....", cleared})
}