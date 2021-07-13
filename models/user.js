const fs = require("fs");
const path = require("path");

const pathFile = path.join(path.dirname(process.mainModule.filename), "data", "user.json");

const getUserFromFile = (cb) => {
  fs.readFile(pathFile, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const loadUsers = () => {
  const fileBuffer = fs.readFileSync(pathFile, "utf-8");
  const users = JSON.parse(fileBuffer);
  return users;
};

module.exports = class User {
  constructor(firstName, lastName, userName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }

  save() {
    getUserFromFile((users) => {
      this.id = Math.trunc(Math.random() * 1000 + 1).toString();
      users.push(this);
      fs.writeFile(pathFile, JSON.stringify(users), (err) => {
        console.log(err);
      });
    });
  }

  static duplicateCheckUserName = (userName) => {
    const users = loadUsers();
    return users.find((user) => user.userName === userName);
  };

  static duplicateCheckEmail = (email) => {
    const users = loadUsers();
    return users.find((user) => user.email === email);
  };

  static duplicateCheckPassword = (password) => {
    const users = loadUsers();
    return users.find((user) => user.password === password);
  };
};
