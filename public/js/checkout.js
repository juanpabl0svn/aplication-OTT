const URL_BACKEND = "http://localhost:5000";

const user = localStorage.getItem("user");
const path = location.pathname.split("/");
const correctPath = path.includes("page");

async function isLogedIn() {
  const userString = JSON.parse(user);
  const req = await fetch(URL_BACKEND + `/check/${userString.token}`);
  if (req.status !== 200) {
    return false;
  }
  return true;
}

async function check() {
  if (correctPath) {
    if (!user) location.href = "/";
    !(await isLogedIn()) && (location.href = "/");
    return
  } else {
    (await isLogedIn()) && (location.href = "/page");
    return
  }
}

window.addEventListener("pageshow", check);
