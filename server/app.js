const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const userModel = require("./models/user")

const cookieParser = require('cookie-parser');

// Cross-Origin Resource Sharing
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Server Created Successfully, Happy")
});

app.post('/create', async (req, res) => {
    try {
        let { username, email, password, age } = req.body;

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create user
        let createdUser = await userModel.create({ username, email, password: hash, age });

        // Generate JWT Token
        let token = jwt.sign({ email }, "ridaqdevaj", { expiresIn: "1h" });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,  // Prevents access from JavaScript
            secure: false,   // Set `true` in production (for HTTPS)
            sameSite: "strict",
            maxAge: 3600000  // 1 hour expiration
        });
        res.status(200).json({ success: true, data: createdUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user", error });
    }
});

app.post("/login", async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.send("Something is Wrong ")
        console.log(user.password, "<= Compare => ", req.body.password);
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            console.log("======>>>>>>>>>> ", result);
            if (result) {
                let token = jwt.sign({ email: user.email }, "ridaqdevaj", { expiresIn: "1h" });
                res.cookie("token", token, {
                    httpOnly: true, 
                    secure: false,
                    sameSite: "strict",
                    maxAge: 3600000
                });
                res.send("Yes you can Login")
            } else {
                res.send("Something is Wrong(if Password is incorrect)")
            }
            // res.status(200).json({ success: true, data: user });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Some thing is went wrong, your cardential is uncorrect", error });
    }

})

app.get("/logout", (req, res) => {
    res.cookie("token", "", { maxAge: 1 });   
    res.send("Logged out successfully");
    // res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Listen on 3000 port 
app.listen(3000);
