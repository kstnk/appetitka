const router = require("express").Router();
const Agents = require("../db/models/agent.model");
const Good = require("../db/models/good.model");
const Applications = require("../db/models/application.model")

router.get("/goodslist", async (req, res) => {
    const goods = await Good.find({});
    res.status(200).json({ goods });
});
router.get("/applications", async (req, res) => {
    const applications = await Applications.find({}).populate('goods.good').populate('buyer')
    res.status(200).json({ applications });
});
router.put("/application/:id", async (req, res) => {
  if (req.body.goods){
    await Applications.findOneAndUpdate({regnumber:req.params.id}, { $set: {isready: "Готовится к отгрузке", goods:req.body.goods}});
  } else {
    await Applications.findOneAndUpdate({regnumber:req.params.id}, { $set: {isready: "Готовится к отгрузке"}});
  }
  res.status(200).json({ message: `Заявка № ${req.params.id} отправлена на склад`});
});
router.delete("/application/:id", async (req, res) => {
  await Applications.findOneAndDelete({regnumber:req.params.id});
  res.status(200).json({ message: `Заявка № ${req.params.id} удалена`});
});
router.get("/agents", async (req, res) => {
    const agents = await Agents.find({});
    res.status(200).json({agents});
});

router.post("/reg", async (req, res) => {
    const itn = req.body.itn;
    const isUser = await Agents.findOne({ "itn": itn })
    if (isUser) {
        res.send(409).json({ message: "Пользователь с таким ИНН уже зарегистрирован" })
    } else {
        const newUser = new Agents({
            "title": req.body.title,
            "itn": itn,
            "password": req.body.password
        });
        await newUser.save()
        req.session.user = newUser
        res.status(201).json({ title: req.body.title, itn: itn })
    }

})






router.put("/goodslist", async (req, res) => {
  const { _id, title, price, stock } = req.body;
  const goodToEdit = await Good.findOne({ _id });
  if (goodToEdit) {
    goodToEdit.title = title;
    goodToEdit.price = price;
    goodToEdit.stock = stock;
    await goodToEdit.save();
    res.status(201).json(goodToEdit);
  } else {
    res.status(404).json({message: "Good not found!"});
  }

});

router.delete("/goodslist", async (req, res) => {
  const { _id } = req.body;
  const goodToDelete = await Good.findOneAndDelete ({ _id });
  if (goodToDelete) {
    res.status(201).json(goodToDelete);
  } else {
    res.status(404).json({message: "Good not found!"});
  }
});

router.post("/reg", async (req, res) => {
  const itn = req.body.itn;
  const isUser = await Agents.findOne({ itn: itn });
  if (isUser) {
    res
      .send(409)
      .json({ message: "Пользователь с таким ИНН уже зарегистрирован" });
  } else {
    const newUser = new Agents({
      title: req.body.title,
      itn: itn,
      password: req.body.password,
    });
    await newUser.save();
    req.session.user = newUser;
    res.status(201).json({ title: req.body.title, itn: itn });
  }
});

module.exports = router;
