import express from "express";
import cookieParser from "cookie-parser";
import { login } from "./Routes/AuthRoutes/auth.js";
import { signUp } from "./Routes/AuthRoutes/auth.js";
import { uploadProduct } from "./Routes/ProductRoutes/uploadProduct.js";
import { viewProducts } from "./Routes/ProductRoutes/viewProducts.js";
import { menShoes } from "./Routes/ProductRoutes/shoeCategory.js";
import { womenShoes } from "./Routes/ProductRoutes/shoeCategory.js";
import { Jackets } from "./Routes/ProductRoutes/otherProducts.js";
import { Shirts } from "./Routes/ProductRoutes/otherProducts.js";
import { Search } from "./Routes/ProductRoutes/otherProducts.js";
import { prodDetails } from "./Routes/ProductRoutes/prodDetails.js";
import { cartItem } from "./Routes/ProductRoutes/cartItem.js";
import { cartDetails } from "./Routes/ProductRoutes/cartdetails.js";
import { removeCart } from "./Routes/ProductRoutes/DeleteCart.js";
import { generateToken } from "./middlewares/generateToken.js";
import { handleStkPush } from "./Routes/Payment_Routes/stkPush.js";
import type { Request, Response } from "express";
import verify from "./middlewares/getId.js";
import getUser from "./middlewares/getUser.js";
import CheckEmail from "./middlewares/checkEmail.js";
import ForgotPassword from "./Routes/AuthRoutes/ForgotPassword.js";
import { fetchAll } from "./Routes/ProductRoutes/FetchAll.js";
import { DeleteProduct } from "./Routes/ProductRoutes/DeleteProduct.js";
import { handleCompletePayment } from "./Routes/Payment_Routes/Callback.js";
import { checkStatus } from "./Routes/Payment_Routes/CheckPayment.js";
import { fetchPurchased } from "./Routes/ProductRoutes/fetchPurchased.js";
import { AllPurchasedProducts } from "./Routes/OrderRoutes/Purchased_Product.js";
import { ClearHistory } from "./Routes/ProductRoutes/clearHistory.js";
import cors from "cors";
const app = express();
const corsOptions = {
  origin:
    "https://klassy-kicks-tq24-git-main-njuguna-samuels-projects.vercel.app",
  methods: "GET,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Homepage" });
});
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
app.post("/clearhistory", ClearHistory);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;
