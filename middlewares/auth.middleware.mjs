import { getUser } from "../services/auth.mjs"

async function restrictToLoggedinUserOnly(req,res,next){
    console.log("Checking user authentication...");
    console.log(req);
    const userloggedUid = req.cookies?.loginuid;
    console.log("Login UID:", userloggedUid);

    if(!userloggedUid) return res.redirect("/login");

    const user = getUser(userloggedUid);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
};

async function checkAuth(req,res,next){
    // console.log("Checking user authentication...");
    // // console.log(req);
    const userloggedUid = req.cookies?.loginuid;
    // console.log("Login UID:", userloggedUid);

    // if(!userloggedUid) return res.redirect("/login");

    const user = getUser(userloggedUid);
    // if(!user) return res.redirect("/login");

    req.user = user;
    next();
}
export { restrictToLoggedinUserOnly,checkAuth };