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
  <script defer src="/js/page.js"></script>
</head>
<body>
<header>
      <div class="logo">
        <a href="/page">
          <img src="/icons/logo.png" alt="logo vajuli" />
        </a>
      </div>
      <div>
        <img id="user" src="/icons/user.png" alt="user">
      </div>
    </header>
    <aside id="user-options" class="hidden">
      <input type="button" value="Ajustes" onclick="location.href='/settings'">
      <input type="button" value="Log out" onclick="logOut()">
    </aside>
  <main>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  </main>
  <footer>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse quibusdam,
      illum est qui voluptas soluta hic earum incidunt, quas explicabo ex alias
      quo. Itaque dolore eaque odit minima inventore reiciendis.
    </footer>
  
</body>
</html>`;
    res.send(html);
  }
);

router.get(
  "/settings",
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
    res.sendFile(path('settings.html'));
  }
);


module.exports = router;
