// index.mjs
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import { connectToMongoDB } from "./connect.mongoose.mjs";
import { restrictToLoggedinUserOnly, checkAuth } from "./middlewares/auth.middleware.mjs";

import URL from "./models/url.model.mjs";

import userRoute from "./routes/userAuthentication.route.mjs"
import urlRoute from "./routes/url.route.mjs";
import staticRoute from "./routes/staticRoute.route.mjs";
import userAuthRoute from "./routes/userAuthentication.route.mjs";

const app = express();
const PORT = 8000;


connectToMongoDB("mongodb://127.0.0.1:27017/URLshortener")
.then(() => console.log("MONGODB Connection Successful"));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser());

// inline middleware when the userisloggedin and the cookie is set only the /url can be accessed
app.use("/url",restrictToLoggedinUserOnly, urlRoute); // for generating short url When method POST , When method GET show analytics
app.use("/user", userRoute);
app.use("/",checkAuth, staticRoute); // for homepage
app.use("/signup",userAuthRoute); // for Signing Up User
app.use("/login",userAuthRoute); // for Loging Up User


app.get('/url/:shortID', async (req,res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
        shortID
        },
        {
        $push:{
        visitHistory:{
            timeStamps : Date.now()
                }
            }
        },{ new: true } // To return the updated document
        );

        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send("URL not found");
        }
});

app.listen(PORT, () => console.log(`Server Started Running at Port: ${PORT}`));