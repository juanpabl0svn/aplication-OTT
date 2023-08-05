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

async function middlewareAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const exist = await isLogedIn(token);
    if (exist) return res.redirect("/main");
    res.clearCookie("token");
  }
  return next();
}

async function middlewareNoAuth(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const exist = await isLogedIn(token);
    if (exist) return next();
    res.clearCookie("token");
  }
  return res.redirect("/");
}

router.get("/", middlewareAuth, function (req, res) {
  res.render("landing", {
    title: "¡Welcome!",
    css: "/styles/landing.css",
    token: false,
    main: "/",
  });
});

router.get("/login", middlewareAuth, function (req, res) {
  res.render("log-in", {
    title: "Log in!",
    css: "/styles/log-in.css",
    token: false,
    main: "/",
  });
});

router.get("/signin", middlewareAuth, function (req, res) {
  res.render("sign-in", {
    title: "Sign in!",
    css: "/styles/sign-in.css",
    token: false,
    main: "/",
  });
});

router.get("/main", middlewareNoAuth, function (req, res) {
  const movies = [
    {
      name: "Codigo enigma",
      img: `/images/codigo-enigma.jpeg`,
      path: "/main/KrDKN86pgjI",
    },
    {
      name: "Jumanji",
      img: `/images/jumanji-2.jpeg`,
      path: "/main/rgpaTwlu_TQ",
    },
  ];
  res.render("main", {
    title: "Main",
    css: "/styles/main.css",
    token: true,
    main: "/main",
    movies,
  });
});

router.get("/main/:path", middlewareNoAuth, function (req, res) {
  const { path } = req.params;
  res.render("watch", {
    title: "Movie",
    css: "/styles/main.css",
    token: true,
    main: "/main",
    path,
  });
});

router.get(
  "/settings",
  middlewareNoAuth,
  function (req, res) {
    res.render("settings", {
      title: "Ajustes",
      css: "/styles/main.css",
      token: true,
      main: "/main",
      path,
    });
  }
);

module.exports = router;
