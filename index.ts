import express from "express";
import cookieParser from "cookie-parser";
import { login } from "./Routes/AuthRoutes/auth.ts";
import { signUp } from "./Routes/AuthRoutes/auth.ts";
import { uploadProduct } from "./Routes/ProductRoutes/uploadProduct.ts";
import { viewProducts } from "./Routes/ProductRoutes/viewProducts.ts";
import { menShoes } from "./Routes/ProductRoutes/shoeCategory.ts";
import { womenShoes } from "./Routes/ProductRoutes/shoeCategory.ts";
import { Jackets } from "./Routes/ProductRoutes/otherProducts.ts";
import { Shirts } from "./Routes/ProductRoutes/otherProducts.ts";
import { Search } from "./Routes/ProductRoutes/otherProducts.ts";
import { prodDetails } from "./Routes/ProductRoutes/prodDetails.ts";
import { cartItem } from "./Routes/ProductRoutes/cartItem.ts";
import { cartDetails } from "./Routes/ProductRoutes/cartdetails.ts";
import { removeCart } from "./Routes/ProductRoutes/DeleteCart.ts";
import { generateToken } from "./middlewares/generateToken.ts";
import { handleStkPush } from "./Routes/Payment_Routes/stkPush.ts";
import verify from "./middlewares/getId.ts";
import getUser from "./middlewares/getUser.ts";
import type { Request, Response } from "express";
import CheckEmail from "./middlewares/checkEmail.ts";
import ForgotPassword from "./Routes/AuthRoutes/ForgotPassword.ts";
import { fetchAll } from "./Routes/ProductRoutes/FetchAll.ts";
import { DeleteProduct } from "./Routes/ProductRoutes/DeleteProduct.ts";
import { handleCompletePayment } from "./Routes/Payment_Routes/Callback.ts";
import { checkStatus } from "./Routes/Payment_Routes/CheckPayment.ts";
import { fetchPurchased } from "./Routes/ProductRoutes/fetchPurchased.ts";
import { AllPurchasedProducts } from "./Routes/OrderRoutes/Purchased_Product.ts";
import cors from "cors";
const app = express();
const corsOptions = {
  origin: "https://klassy-kicks-xyz.vercel.app/",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());
app.post("/signup", getUser, signUp);
app.post("/login", login);
app.post("/uploadproduct", uploadProduct);
app.get("/viewproducts", viewProducts);
app.get("/men", menShoes);
app.get("/women", womenShoes);
app.get("/jackets", Jackets);
app.get("/shirts", Shirts);
app.get("/search/:searchitem", Search);
app.get("/productdetails/:id", prodDetails);
app.post("/mycartproduct", verify, cartItem);
app.get("/fetch_cart_details/:id", cartDetails);
app.delete("/removecartitem/:id", removeCart);
app.post("/lipanampesa", generateToken, handleStkPush);
app.patch("/patchpassword", ForgotPassword);
app.get("/changepassword/:email", CheckEmail);
app.get("/getallproducts", fetchAll);
app.delete("/deleteitem/:id", DeleteProduct);
app.post("/callbackrecieve/:location/:itemId", handleCompletePayment);
app.post("/checkpaymentstatus", checkStatus);
app.post("/fetchpurchasedproducts", fetchPurchased);
app.get("/allpurchasedproducts", AllPurchasedProducts);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app



