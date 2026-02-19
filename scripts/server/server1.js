import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { addpost, addUser, getUser, login, modifyDataValue, modifyPostValue, fetchPosts } from "../index.js";
import session from "express-session";
import multer from "multer";
import fs from "fs";

//configure
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../../uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

/**Saves the template files */
const postStorage = multer.diskStorage({

    destination: (req, file, cb) => {

        const userId = req.session.userId;
        const postId = req.session.postId;
        const uploadPath = path.join(__dirname, "../../posts", "users", userId, `post_${postId}`);

        fs.mkdir(uploadPath, { recursive: true }, (err) => {

            if (err) return cb(err, uploadPath);
            cb(null, uploadPath);

        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

/**
 * Saves the template image
 */
const tempDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.session.userId;
        const postId = req.session.postId;
        const uploadPath = path.join(__dirname, "../../posts", "users", userId, `post_${postId}`, "images");

        fs.mkdir(uploadPath, { recursive: true }, (err) => {

            if (err) return cb(err, uploadPath);
            cb(null, uploadPath);

        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

//save the template files in the given folder
const postUplaod = multer({ storage: postStorage });

//Comment: save the template image to the givin folder.
const productImg = multer({storage: tempDisk}); 


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../uploads")));
app.use(express.static(path.join(__dirname, "../../posts/users")))
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
    if (req.session.isLogin) {
        res.sendFile(path.join(__dirname, "../../public", "profileSetUp.html"));
    } else {

        res.redirect("/log");
    }
});

//save user profile image
const upload = multer({ storage: storage });

app.post("/login", async (req, res) => {
    try {

        const username = req.body.username;
        const pwd = req.body.password;

        const validator = await login(username, pwd);

        if (validator[0] === true) {

            req.session.isLogin = true;
            req.session.user = username;
            req.session.userId = validator[1];
            console.log(validator);

            res.json({ state: true, message: "Success" });
        }
        else {

            req.session.isLogin = false;
            res.json({ state: false, message: "Invalid Username or Password" });

        }
    }
    catch (e) {
        res.json({ state: false, message: "An error occure in our end. Please try again later" });
        console.log("Login", e);
    }
});

app.post("/api/user", async (req, res) => {
    console.log("first: ", req.session.userId);
    try {

        if (req.session.userId) {

            console.log("second: ", req.session.userId);
            const userValid = await getUser(req.session.userId);

            if (userValid[0] == true) {
                console.log("yup")
                res.json({ info: JSON.stringify(userValid[1][0]) });
            }
            else {
                req.session.isLogin = false;
                res.redirect("/log");
            }
        } else {
            res.redirect("/log");
        }
    }
    catch (e) {

        res.redirect("/log");

    }

})


app.get("/api/usr", async (req, res) => {

    try {

        if (req.query.userId) {

            const userValid = await getUser(req.query.userId);

            if (userValid[0] == true) {
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

    const name = req.body.fname;
    const username = req.body.username.trim();
    const pwd = req.body.password;
    const email = req.body.email;

    if (username.includes(" ")) {
        res.json({ state: false, message: "Username Should not contain space. Only characters, numbers and letters", src: "/" }); //sends data 
    }
    else if (!email.includes("@")) {
        res.json({ state: false, message: "Email address should contain '@'", src: "/" }); //sends data 
    }
    else if (name == "" || name == " ") {
        res.json({ state: false, message: "Please fill in the name field", src: "/" }); //sends data 
    }
    else if (email === "" || email === "@") {
        res.json({ state: false, message: "Please email is required", src: "/" }); //sends data 
    }
    else {

        const randId = Math.floor(Math.random() * 999999);
        const userId = `${username}_${randId}`;
        const usertag = `@${username.toLowerCase()}`;

        //Comment: saves user value in the db
        const acc = await addUser([name, username, pwd, usertag, " ", email, userId, 1.00]);

        if (acc[0] == true) {

            req.session.isLogin = true;
            req.session.user = username;
            req.session.userId = userId;

            res.json({ state: true, message: "Success", src: "/setup/profile" }); //sends data 

        } else {
            res.json({ state: false, message: "An Error Occure whiles creating you account. Please try again", src: "/" }); //sends data 
        }
    }
});

//==================================Comment: Upload profile Image======================================================================
app.post("/profileImage/upload", upload.single("image"), async (req, res) => {
    try {

        const up = await modifyDataValue("p_img_link", req.file.filename, req.session.userId);
        if (up[0] === true) {
            res.json({ message: "Image uploaded successfuly " });
        }

        else {
            console.error("Error saving image path in the db", up[1]);
            res.json({ message: "Problem uploading image to the server" });
        };
    }
    catch (e) {
        console.error("An error occur:", e);
    };

});

//=================================Upload product Image===============================
app.post("/template/img/upload", productImg.single("image"), async (req, res) => {
    try {

        const userId = req.session.userId;
        const postId = req.session.postId;
        const file = req.file;

        const path = `${userId}/post_${postId}/images/${Date.now()}-${file.originalname}`;

        const up = await modifyPostValue("post_img", path, req.session.userId, req.session.postId);
        if (up[0] === true) {
            res.json({ state: true, message: "Image uploaded successfuly" });
        }

        else {
            console.error("Error saving image path in the db", up[1]);
            res.json({ state: false, message: "Error uploading template" });
        };
    }
    catch (e) {
        console.error("An error occur:", e);
        res.json({ state: false, message: "Error uploading template" });
    };

});

//==================================Update user profile=============================
app.post("/api/user/profile", async (req, res) => {
    const usrBio = req.body.info;
    const up = await modifyDataValue("userBio", usrBio, req.session.userId);

    if (up[0] === true) {
        res.json({ stats: true, message: "success", src: "/home" });
    }

    else {
        console.log(up);
        res.json({ stats: false, message: "Cannot add info try again" });
    }
});


//=================================To add post to the data base===================================
app.post("/api/user/add/post", async (req, res) => {

    const data = JSON.parse(req.body.info);
    const postId = `${data.tName.slice(4)}_${req.session.userId.slice(4)}${Date.now()}`
    const __addPost = await addpost(req.session.userId, postId, "", "", data.tName, data.tPrice, data.tDes, data.tCat);

    if (__addPost[0] === true) {
        console.log("New post");
        req.session.postId = postId;
        res.json({ state: true, message: "Successfully added" });
    }
    else {
        console.error("ERROR:", __addPost[1]);
        res.json({ state: false, message: "There was a problem uploading your product" });
    };
});


//======================a post endpoint to store template images===============================
app.post("/postImage/upload", upload.single("image"), async (req, res) => {
    try {

        console.log(req.file.filename);

        const up = await modifyPostValue("post_img", req.file.filename, req.session.userId, req.session.postId);

        if (up[0] === true) {
            res.json({ message: "Image uploaded successfuly " });
        }

        else {
            console.log("Error saving image path in the db", up[1]);
            res.json({ message: "Problem uploading image to the server" });
        };
    }
    catch (e) {
        console.error("An error occur:", e);
    };

});


//======================a post endpoint to store template images===============================
app.post("/post/file/upload", postUplaod.array("files", 10), async (req, res) => {
    try {

        console.log("file uploaded successfully");
        const up = await modifyPostValue("postdir", `${req.session.userId}/post_${req.session.postId}`, req.session.userId, req.session.postId);

        if (up[0] === true) {
            res.json({ message: "Image uploaded successfuly " });
        }

        else {
            console.log("Error saving file path in the db", up[1]);
            res.json({ message: "Problem uploading image to the server" });
        };
    }
    catch (e) {
        console.error("An error occur:", e);
    };
});

/**
 * Get posts 
 */
app.get("/get/posts", async (req, res) => {
    const cursor = req.query.cursor;

    const rest = await fetchPosts(cursor);

    if (rest[0] === true) {
        res.json({ state: true, data: rest[1] })
    }
    else {
        res.json({ state: false, data: "error!" })
        console.log(res[1]);
    }
});

//**=====================Logout user============================ */
app.get("/user/logout", (req, res) => {
    req.session.userId = null;
    req.session.isLogin = false;
    req.session.postId = null;
    req.session.user = null;

    console.log("yo")
    res.json({ message: "hey" })
});


app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
})
