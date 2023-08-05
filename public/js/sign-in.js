const $ = (el) => document.querySelector(el);
const $all = (el) => document.querySelectorAll(el);
const path = location.pathname.split('/')


const URL_BACKEND = "http://localhost:5000";

const types = {
  1: 'Mensual',
  2: 'Semestral',
  3: 'Anual'
}

if (path.length === 3){
  const value = path[2]
  const select = $('select')

  select.innerHTML = `<option value="${value}">${types[value]}</option>`
}


function getMermershipTime(type) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = new Date(`${year}/${month}/${day}`);
  let addMonths;
  if (type === "1") {
    addMonths = 1;
  } else if (type === "2") {
    addMonths = 6;
  } else if (type === "3") {
    addMonths = 12;
  }
  date.setMonth(date.getMonth() + addMonths);
  const newDay = date.getDate();
  const newMonth = date.getMonth() + 1;
  const newYear = date.getFullYear();
  const newDate = new Date(`${newYear}/${newMonth}/${newDay}`);
  return [currentDate, newDate];
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
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Escoja una membresia!",
    });
  }
  if (data.password != data.rpassword) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Contraseñas no coinciden!",
    });
  }

  const [current, next] = getMermershipTime(data.membership);

  data["startMerbership"] = current;
  data["endMerbership"] = next;

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const req = await fetch(URL_BACKEND + "/create", request);
  if (req.status !== 200) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Usuario o correo ya registrado!",
    });
  }
  const res = await req.json();

  document.cookie = `token=${res.token}`;

  location.href = "/main";
});
