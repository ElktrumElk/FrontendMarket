import db from "./db.js"
import Input, { main, writeLine, int, keyPress } from "interacter";

/**
 * # Account creation
 * add user to the database
 * @param {Array} info 
 */
export async function addUser(info) {

  try {
    const sql = `INSERT INTO users 
  (name, username, password, user_tag, userbio, email, userId, balance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const [result] = await db.execute(sql, info);
    console.log("Succes", result.insertId);

    return [true, result.insertId];

  }
  catch (e) {
    return [false, `An error occur: ${e}`]
  }
}

/**
 * Login validation
 * @param {string} username
 * @param {string} password 
 * @returns 
 */
export async function login(username, password) {

  try {
    const [row] = await db.query("SELECT password FROM users WHERE username = ?", [username]);

    if (row.length === 0) { return [false, "Invalid username or password"] };

    if (password === row[0].password) {

      const [userId] = await db.query("SELECT userId FROM users WHERE password = ?", [password])
      return [true, userId[0].userId];
    }
    else {

      console.log("Invalig credintial");
      return [false, "No user found"];

    }
  }
  catch (e) {
    console.error("An error occur:", e);
  }
}

/**
 * Get the information of the user
 * @param {string} userId 
 * @returns 
 */
export async function getUser(userId) {

  try {

    const [row] = await db.query("SELECT name, username, user_tag, userbio, email, userId, balance, p_img_link, following, followers, products FROM users WHERE userId = ?", [userId]);

    if (!row && row.length == 0) return [false, "Invalid user"];

    return [true, row];
  }
  catch (e) {
    return [false, `An error occur in the db ${e}`]
  }
}


export async function modifyDataValue(dataname, value, USERID) {

  try {
    const sql = `UPDATE users SET ${dataname} = ? WHERE userId = ?`;

    const [res] = await db.execute(sql, [value, USERID]);

    return [true, res];
  }
  catch (e) {
    return [false, `A error occur: ${e}`];
  }

}
//time to xlp: 16 feb 12:57
//next update comming up
export async function addpost(user_id, post_id, post_img, post_dir, post_name, post_price, post_des, post_cat) {
  try {

    const sql = `INSERT INTO posts (user_id, postid, post_img, postdir, post_name, post_des, post_price, post_cat) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [res] = await db.execute(sql, [user_id, post_id, post_img, post_dir, post_name, post_des, post_price, post_cat]);
    return [true, res];

  }
  catch (e) {
    return [false, `An error occur: ${e}`];
  }
};

export async function getPost(user_id, post_id) {
  try {
    const [result] = await db.query('SELECT * FROM posts WHERE user_id = ? AND postid = ?', [user_id, post_id]);
    return [true, result]
  }
  catch (e) {
    return [false, `An error occur: ${e}`];
  };
};

export async function modifyPostValue(dataname, value, USERID, postid) {

  try {
    const sql = `UPDATE posts SET ${dataname} = ? WHERE user_id = ? AND postid = ?`;

    const [res] = await db.execute(sql, [value, USERID, postid]);

    return [true, res];
  }
  catch (e) {
    return [false, `A error occur: ${e}`];
  }

}

/**
 * 
 * @param {number} cur accept integer value
 * @returns 
 */
export async function fetchPosts(cur) {
  try {

    const [ps] = await db.query("SELECT * FROM posts WHERE id < ? ORDER BY id DESC LIMIT 5", [cur]);
    return [true, ps];
  }
  catch (e) {
    console.log("error occur whiles retreiving the posts", e);
    return [false, e]
  }
}

//let info = ["Elkanah Cole", "Developer", "123456", "2000-05-10", "USR001", 500.00]
/*
main(async () => {

  writeLine("===============Welcome to frontend Market============");
  writeLine("1. Login \t 2. Create Account \t 3. Get user");

  const choice = new Input();

  await choice.readl(">> ", keyPress((k) => {

    try {

      int(choice);

    }
    catch (e) {

      for (let i = 1; i <= 3; i++) {
        choice.write(i.toString());
      }

    }

  }));

  const username = new Input();
  const password = new Input();
  const fname = new Input();
  const dob = new Input();
  const userBio = new Input();
  const email = new Input();


  if (choice.value == "1") {

    await username.readl("Enter Username: ");
    await password.readl("Enter password: ");

    const valid = await login(username.value, password.value);
    if (valid[0] === true) {
      writeLine("1. Get post \t 2. Add post");

      const choice = new Input();

      await choice.readl(">> ", keyPress((k) => {
        try {
          int(choice);
        } catch (e) {
          for (let i = 1; i <= 2; i += 1) {
            choice.write(i.toString());
          }
        }
      }));

      if (choice.value == "1") {
        const post = await getPost(valid[1], "post1");
        console.log(post);
      }
      else if (choice.value == "2") {
        const newPost = await addpost(valid[1], "post1", "images/1234567.jpeg", "posts/", "Simple Portfolio", 200, "Just a simple template", "landing page");
        console.log(newPost);
      }

    }

  }
  else if (choice.value === "2") {

    await fname.readl("Enter fullname: ");

    await username.readl("Enter username: ", keyPress((k) => {
      if (k == " ") {
        username.alt(" ");
      }
    }));

    await password.readl("Enter password: ");
    await userBio.readl("Write short thing about your self: ");
    await email.readl("Enter email address for validation: ");

    const userTag = `@${username.value.toLowerCase()}`;
    const _user_id = `${username.value.toLowerCase()}_${Math.floor(Math.random() * 99999)}`;

    await addUser([fname.value, username.value, password.value, userTag, userBio.value, email.value, _user_id, "0.00"]);

    console.log("success");
  }
  else if (choice.value === "3") {
    const USERID = new Input();

    await USERID.readl("Enter user id: ");

    const v = await getUser(USERID.value);
    console.log(v);

  }
});
*/