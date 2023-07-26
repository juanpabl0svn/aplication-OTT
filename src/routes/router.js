const { Router } = require("express");
const {join} = require("path");

const path = (html) => join(__dirname,'..','pages',html)

const router = Router();

router.get("/", (req, res) => {
  res.sendFile(path('landing.html'))
});

router.get("/login", (req, res) => {
  res.sendFile(path('login.html'))
});
router.get("/create", (req, res) => {
  res.sendFile(path('create-user.html'))
});

router.get("/page", (req, res) => {
  res.sendFile(path('page.html'))
});
module.exports = router;
