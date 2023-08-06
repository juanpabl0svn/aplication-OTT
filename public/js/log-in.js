const $ = (el) => document.querySelector(el);

const URL_BACKEND = 'http://localhost:5000'

$(".special-input").addEventListener("keyup", (e) => {
  const value = e.target.value;
  e.target.value = value.toUpperCase();
});

$("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const req = await fetch(URL_BACKEND + "/auth", request);
  if (req.status !== 200) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrectos!',
    })
  }
  const res = await req.json();

  document.cookie = `token=${res.token}`;

  location.href = "/main";
});

const hide =  $('#hide-password')
const show = $('#show-password')

const password = $('#password')


hide.addEventListener("click", async (e) => {
  password.type = 'password'
  e.target.classList.add('hide-image')
  show.classList.remove('hide-image')
})

show.addEventListener("click", async (e) => {
  password.type = 'text'
  e.target.classList.add('hide-image')
  hide.classList.remove('hide-image')
})