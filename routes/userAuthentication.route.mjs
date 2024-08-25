import express from 'express';
import { handleUserSignUp,handleUserLogin } from '../controllers/user.controller.mjs';

const router = express.Router();


// Route to handle sign-up form submission
// router.post("/signup",handleUserSignUp);

// Route to handle sign-up form submission
router.post("/signup", (req, res) => {
    console.log("at userAuthen : Received POST request to /signup");
    console.log("Request body:", req.body); // Check form data

    // Call the controller function
    handleUserSignUp(req, res);
});

// Route to handle login form submission
router.post("/login",handleUserLogin);

export default router;