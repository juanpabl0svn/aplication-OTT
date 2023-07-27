const $ = (el) => document.querySelector(el);
const $all = (el) => document.querySelectorAll(el);

const URL_BACKEND = "http://localhost:5000";

function getMermershipTime() {
  const fecha = new Date();
  const day = fecha.getDate();
  const month = fecha.getMonth();
  const year = fecha.getFullYear();
  const currentDate = `${year}/${month}/${day}`;
  const next = `${year + 1}/${month}/${day}`;
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

  const [current, next] = getMermershipTime();

  data["startMerbership"] = new Date(current);
  data["endMerbership"] = new Date(next);

  console.log(data);

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const req = await fetch(URL_BACKEND + "/create", request);

  const res = await req.json();

  console.log(res);
});
