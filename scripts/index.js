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

    const [row] = await db.query("SELECT name, username, user_tag, userbio, email, userId, balance FROM users WHERE userId = ?", [userId]);

    if (!row && row.length == 0) return [false, "Invalid user"];

    return [true, row];
  }
  catch (e) {
    return [false, `An error occur in the db ${e}`]
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

    await login(username.value, password.value);
    writeLine(username.value)

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
    console.log(v[1][0]);

  }
});

*/