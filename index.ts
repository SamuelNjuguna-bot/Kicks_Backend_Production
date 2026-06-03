import express from "express";
import cookieParser from "cookie-parser";
import { login } from "./Routes/AuthRoutes/auth";
import { signUp } from "./Routes/AuthRoutes/auth";
import { uploadProduct } from "./Routes/ProductRoutes/uploadProduct";
import { viewProducts } from "./Routes/ProductRoutes/viewProducts";
import { menShoes } from "./Routes/ProductRoutes/shoeCategory";
import { womenShoes } from "./Routes/ProductRoutes/shoeCategory";
import { Jackets } from "./Routes/ProductRoutes/otherProducts";
import { Shirts } from "./Routes/ProductRoutes/otherProducts";
import { Search } from "./Routes/ProductRoutes/otherProducts";
import { prodDetails } from "./Routes/ProductRoutes/prodDetails";
import { cartItem } from "./Routes/ProductRoutes/cartItem";
import { cartDetails } from "./Routes/ProductRoutes/cartdetails";
import { removeCart } from "./Routes/ProductRoutes/DeleteCart";
import { generateToken } from "./middlewares/generateToken";
import { handleStkPush } from "./Routes/Payment_Routes/stkPush";
import verify from "./middlewares/getId";
import getUser from "./middlewares/getUser";
import type { Request, Response } from "express";
import CheckEmail from "./middlewares/checkEmail";
import ForgotPassword from "./Routes/AuthRoutes/ForgotPassword";
import { fetchAll } from "./Routes/ProductRoutes/FetchAll";
import { DeleteProduct } from "./Routes/ProductRoutes/DeleteProduct";
import { handleCompletePayment } from "./Routes/Payment_Routes/Callback";
import { checkStatus } from "./Routes/Payment_Routes/CheckPayment";
import { fetchPurchased } from "./Routes/ProductRoutes/fetchPurchased";
import { AllPurchasedProducts } from "./Routes/OrderRoutes/Purchased_Product";
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



