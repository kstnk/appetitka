const router = require("express").Router();
const Applications = require("../db/models/application.model");
const Goods = require("../db/models/good.model");
const Agents = require("../db/models/agent.model");

router.get("/profile/:id", async (req, res) => {
  const login = req.params.id;

  const buyerID = await Agents.findOne({ login });
  if (buyerID) {
    const applications = await Applications.find({ buyer: buyerID._id })
      .populate("goods.good")
      .populate("buyer");
    res.status(200).json({ applications });
  } else res.json({message: 'error'})
});

router.post("/cart/:id", async (req, res) => {
  const login = req.params.id;
  const agent = await Agents.findOne({ login: login });
  const allAplications = await Applications.find({}).sort({regnumber:-1})
  const registrationNumber = allAplications[0].regnumber + 1

  const current_application = new Applications({
    goods: req.body.goods,
    buyer: agent._id,
    regnumber: registrationNumber,
    date: new Date(),
    comment: req.body.comment,
  });
  await current_application.save();
  res.status(201).json({ message: "Заявка отправлена на обработку" });
});

router.get("/goods", async (req, res) => {
  const goods = await Goods.find().sort({ title: 1 });
  res.status(200).json(goods);
});

router.get("/getUserInfo", (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json(user.login);
  } else res.end();
});

router.get('/getAgentDetails/:name', async (req, res) => {
  const agent = await Agents.findOne({ login: req.params.name });
  res.json({
    title: agent.title,
    phone: agent.phone,
    itn: agent.itn
  });
});

module.exports = router;
