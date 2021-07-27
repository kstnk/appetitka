const router = require("express").Router();
const Admin = require("../db/models/admin.model");
const Agents = require("../db/models/agent.model");
const mailer = require('../nodemailer');

router.post("/login", async (req, res) => {
  login = req.body.login;
  password = req.body.password;
  let admin = await Admin.findOne({ login: login });
  if (admin && admin.isAdmin) {
    if (admin.password === password) {
      req.session.user = admin;
      res.json({ admin: login });
    }
  } else {
    let findUser = await Agents.findOne({ login: login });
    if (findUser) {
      if (findUser.password == password) {
        req.session.user = findUser;
        res.status(202).json({ login: findUser.login, title: findUser.title });
      } else {
        res.status(401).json({ message: "Неверный пароль" });
      }
    } else {
      res.status(401).json({
        message:
          "Пользователь с указанным Логином не зарегистрирован.\n Проверьте правильность ввода Логина",
      });
    }
  }
});

router.post("/reg", async (req, res) => {
  const login = req.body.login;
  const isUser = await Agents.findOne({ login: login });
  if (isUser) {
    res
      .status(409)
      .json({ message: "Пользователь с таким Логином уже зарегистрирован" });
  } else {
    const newUser = new Agents({
      title: req.body.title,
      login:login,
      phone: req.body.phone,
      email: req.body.email,
      itn: req.body.itn,
      password: req.body.password,
    });
    await newUser.save();
    req.session.user = newUser;
    console.log(req.session)
    res.status(201).json({ title: req.body.title, login: login });
    const message = {
      to: req.body.email,
      subject: 'Congratulations! You are successfully registred on our site',
      html: `
      <h2>Поздравляем, Вы успешно зарегистрировались на нашем сайте!</h2>
      
      <i>данные вашей учетной записи:</i>
      <ul>
          <li>login: ${req.body.email}</li>
          <li>password: ${req.body.password}</li>
      </ul>`,
    };
    mailer(message);
    console.log(message);
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.end();
});


module.exports = router;
