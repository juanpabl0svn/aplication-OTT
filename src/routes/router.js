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

router.get(
  "/page/:id",
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
    const { id } = req.params;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="/styles/movie.css">
</head>
<body>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  
</body>
</html>`;
    res.send(html);
  }
);

module.exports = router;
