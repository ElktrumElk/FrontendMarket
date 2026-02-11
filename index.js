import db from "./db.js"
import Input, { int, keyPress, main, writeLine } from "./IOS/ios.js";

async function addUser(info) {

  const sql = `INSERT INTO users 
  (name, username, password, dob, userId, balance) 
  VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, info);
  console.log("Succes", result.insertId);
}

async function login(username, password) {

  try {
    const [row] = await db.query("SELECT password FROM users WHERE username = ?", [username])

    if (password === row[0].password) {
      console.log("Success");
      return;
    }
    else {
      console.log("Invalig credintial");
      return;
    }
  }
  catch (e) {
    console.error("An error occur:", e);
  }
}

async function getUser(userId) {
  
  const [row] = await db.query("SELECT * FROM users WHERE userId = ?", [userId]);

  if (!row) return false;

  return row;
}




//let info = ["Elkanah Cole", "Developer", "123456", "2000-05-10", "USR001", 500.00]

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


  if (choice.value == "1") {


    await username.readl("Enter Username: ");
    await password.readl("Enter password: ");

    await login(username.value, password.value);
    writeLine(username.value)

  }
  else if (choice.value === "2") {

    await fname.readl("Enter fullname: ");
    await username.readl("Enter username: ");
    await password.readl("Enter password: ");
    await dob.readl("Enter Date of birth: ");

    await addUser([fname.value, username.value, password.value, dob.value, "USER2", "0.00"]);

    console.log("success");
  }
  else if (choice.value === "3") {
    const USERID = new Input();

    await USERID.readl("Enter user id: ");

    console.log(await getUser(USERID.value))

  }
});

