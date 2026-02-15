import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { addUser, getUser, login, modifyDataValue } from "../index.js";
import session from "express-session";
import multer from "multer";


//configure
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

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

app.get("/creatAccount", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public", "create_account.html"));
});


app.get("/setup/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public", "profileSetUp.html"));
});


const upload = multer({ storage: storage });



app.post("/login", async (req, res) => {

    const username = req.body.username;
    const pwd = req.body.password;

    const validator = await login(username, pwd);

    if (validator[0] === true) {

        req.session.isLogin = true;
        req.session.user = username;
        req.session.userId = validator[1];

        res.redirect("/home");
    }
    else {

        req.session.isLogin = false;
        res.redirect("/log");
    }
});

app.post("/api/user", async (req, res) => {

    try {

        if (req.session.userId) {

            const userValid = await getUser(req.session.userId);

            console.log(userValid[1][0])

            if (userValid[0] == true) {
                console.log("y")
                res.json(JSON.stringify({ info: userValid[1][0] }));
            }
            else {
                req.session.isLogin = false;
                res.redirect("/log");
            }
        }
    }
    catch (e) {

        res.redirect("/log");

    }

})

app.post("/api/user/createAccount", async (req, res) => {

    console.log(process.env.DB_KEY);

    const name = req.body.fname;
    const username = req.body.username;
    const pwd = req.body.password;
    const email = req.body.email;

    const randId = Math.floor(Math.random() * 999999);
    const userId = `${username}_${randId}`;
    const usertag = `@${username.toLowerCase()}`;

    const acc = await addUser([name, username, pwd, usertag, " ", email, userId, 1.00]);
    console.log(acc);

    if (acc[0] == true) {
        req.session.isLogin = true;
        req.session.user = username;
        req.session.userId = userId;
        res.redirect('/setup/profile');

    } else {
        res.redirect('/creatAccount');
    }
});

app.post("/profileImage/upload", upload.single("image"), (req, res) => {
    res.json({ message: "Image uploaded successfuly " })
});

app.post("/api/user/profile", async (req, res) => {
    const usrBio = res.body.p_bio;
    const up = await modifyDataValue("userBio", usrBio, req.session.userId);
    if (up[0] === true) {
        res.redirect('/home');
    }
    else {
        console.log(up);
        res.json({"message": "Cannot add info try again"});
    }
});


app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
})
