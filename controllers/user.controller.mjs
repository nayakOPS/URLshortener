import User from "../models/user.model.mjs";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser } from "../services/auth.mjs";

async function handleUserSignUp(req,res){
    console.log("Handling user signup...");
    const { name, email, password } = req.body;
    console.log("Received user data:", { name, email, password });

    /* await User.create({
        name,
        email,
        password 
    }); */

    try {
        // Attempt to create a new user
        const newUser = await User.create({
            name,
            email,
            password
        });
        console.log("User created successfully:", newUser);
        // Redirect or send response indicating successful signup
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle error, perhaps send an error response
    }
    
    // after Signing Up
    return res.redirect("/login");
};

async function handleUserLogin(req,res){
    const { email, password } = req.body;
    const userDetails = await User.findOne({
        email,
        password 
    });

    if(!userDetails) return res.status(404).render("login.view.ejs",{
        error : "Invalid Username or Password"
    });

    const token = setUser(userDetails);
    res.cookie("loginuid",token);

    // after Loging Up Redirecting to Homepage "/"
    return res.redirect("/");
};

export { handleUserSignUp, handleUserLogin };