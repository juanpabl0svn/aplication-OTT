const { Router } = require("express");
const { join } = require("path");

const path = (html) => join(__dirname, "..", "pages", html);
const URL_BACKEND = "http://localhost:5000";

const router = Router();

async function isLogedIn(token) {
  const req = await fetch(URL_BACKEND + `/check/${token}`);
  if (req.status !== 200) {
    return false;
  }
  return true;
}

// router.use(async (req, res, next) => {
//   const path = req.path.split("/");
//   const token = req.cookies.token;
//   console.log("baby");

//   if (path.includes("page")) {
//     if (token) {
//       const exist = await isLogedIn(token);
//       if (exist) {
//         next();
//         return;
//       }
//     }
//     return res.redirect("/");
//   }

//   if (!token) return next();
//   const exist = await isLogedIn(token);
//   if (exist) return res.redirect("/page");

//   return next();
// });

router.get(
  "/",
  async function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
      const exist = await isLogedIn(token);
      if (exist) return res.redirect("/page");
      res.clearCookie("token");
    }
    return next();
  },
  function (req, res) {
    res.sendFile(path("landing.html"));
  }
);

router.get(
  "/login",
  async function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
      const exist = await isLogedIn(token);
      if (exist) return res.redirect("/page");
      res.clearCookie("token");
    }
    return next();
  },
  function (req, res) {
    res.sendFile(path("login.html"));
  }
);
router.get(
  "/create",
  async function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
      const exist = await isLogedIn(token);
      if (exist) return res.redirect("/page");
      res.clearCookie("token");
    }
    return next();
  },
  function (req, res) {
    res.sendFile(path("create-user.html"));
  }
);

router.get(
  "/page",
  async function (req, res, next) {
    const token = req.cookies.token;
    if (token) {
      const exist = await isLogedIn(token);
      if (exist) return next();
      res.clearCookie("token");
    }
    return res.redirect("/");
  },
  function (req, res) {
    res.sendFile(path("page.html"));
  }
);
module.exports = router;
