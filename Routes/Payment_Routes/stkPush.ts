import axios from "axios";
import { timestamp } from "../../Utils/timeStamp.js";
import type { Response } from "express";
import type { RequestExtended } from "../../middlewares/generateToken";

const handleStkPush = async (req: RequestExtended, res: Response) => {
  const { phone, price, product_Name, location, itemId } = req.body;
  const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE as string;
  const password = Buffer.from(
    BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp,
  ).toString("base64");
  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: price,
    PartyA: phone,
    PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
    PhoneNumber: phone,
    CallBackURL: `https://nonvisible-lanette-unmelodised.ngrok-free.dev/callbackrecieve/${location}/${itemId}`,
    AccountReference: ` Buy ${product_Name} from Klassy Kicks.`,
    TransactionDesc: "Payment",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      },
    );
    const responseCode = response.data;
    if (responseCode) {
      res.status(201).json({
        message: true,
        data: response.data.MerchantRequestID,
      });
    } else {
      res.status(500).json({
        message: "Something went wrong please check your phone number",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: "Failed",
      error: error.message,
    });
  }
};
export { handleStkPush };
