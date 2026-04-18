const { Users }= require('../src/models');
const bcrypt = require('bcrypt');

async function seedAdmin(){
  const saltRound = 16
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  await Users.create({
    "email": email,
    "password": hashedPassword,
    "fullName": "adminNihBos",
    "confirmPassword": password,
    "role": "admin"
    } 
  )
  console.log("Admin pertama berhasil dibuat!");
  process.exit();
}

seedAdmin();