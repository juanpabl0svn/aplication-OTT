const $ = (el) => document.querySelector(el);

const URL_BACKEND = "http://localhost:5000";

$("form").addEventListener("submit", async(e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target))

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  console.log(data)

  const req = await fetch(URL_BACKEND +'/auth',request)
  const res = await req.json()

  console.log(res)



});
