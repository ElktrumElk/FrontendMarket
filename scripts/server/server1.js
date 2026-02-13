import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { login } from "../index.js";
import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../public")));


app.use(session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false

}));

app.get("/", (req, res) => {
    res.redirect("/log");
})
app.get("/log", (req, res) => {

    if (req.session.isLogin) {
        res.sendFile(path.join(__dirname, "../../home.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "../../public", "login.html"));
    };
});

app.get("/home", (req, res) => {
    if (!req.session.isLogin) {
        res.sendFile(path.join(__dirname, "../../public", "login.html"));
    }
    else {
        res.sendFile(path.join(__dirname, "../../home.html"));
    }
});

app.post("/login", async (req, res) => {

    const username = req.body.username;
    const pwd = req.body.password;

    const validator = await login(username, pwd);
    
    if (validator[0] === true) {
        console.log(validator)

        req.session.isLogin = true;
        req.session.user = username;

        res.redirect("/home");
    }
    else {

        req.session.isLogin = false;
        res.redirect("/log");
    }
});

//app.post("/api/home/user", )

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
})
