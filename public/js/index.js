const $ = (el) => document.querySelector(el);

const URL_BACKEND = "http://localhost:5000";

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
  if (req.status !== 200){
    return alert('algo salio mal')
  }
  const res = await req.json();
  localStorage.setItem('user', JSON.stringify(res))
});
