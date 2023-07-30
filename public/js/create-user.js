const $ = (el) => document.querySelector(el);
const $all = (el) => document.querySelectorAll(el);

const URL_BACKEND = "http://localhost:5000";

function getMermershipTime(type) {
  const fecha = new Date();
  const day = fecha.getDate();
  const month = fecha.getMonth() + 1;
  const year = fecha.getFullYear();
  const currentDate = `${year}/${month}/${day}`;
  let next;
  if (type == 1) {
    next = `${year}/${month + 1}/${day}`;
  } else if (type == 2) {
    next = `${year}/${month + 6}/${day}`;
  }else if(type == 3) {
    next = `${year + 1}/${month}/${day}`;

  }
  return [currentDate, next];
}

$all(".special-input").forEach((element) => {
  element.addEventListener("keyup", (e) => {
    const value = e.target.value;
    e.target.value = value.toUpperCase();
  });
});

$("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.membership == 0) {
    return alert("Please select a membership");
  }
  if (data.password != data.rpassword) {
    return alert("Passwords are not the same");
  }

  const [current, next] = getMermershipTime(data.membership);

  data["startMerbership"] = new Date(current);
  data["endMerbership"] = new Date(next);


  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const req = await fetch(URL_BACKEND + "/create", request);
  if (req.status !== 200) return;

  const res = await req.json();

  document.cookie = `token=${res.token}`;

  location.href = "/page";
});
