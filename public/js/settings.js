const $ = (el) => document.querySelector(el)

const URL_BACKEND = 'http://localhost:5000'

function logOut() {
  document.cookie.split(";").forEach(function (cookie) {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  location.href = '/'
}




$('#user').addEventListener('click',()=>{
  $('aside').classList.toggle('hidden')
})

async function deleteAccount(){
  const cookie = document.cookie
  const token = cookie.slice(6,cookie.length)
  console.log(token)
  const req = await fetch(URL_BACKEND + `/delete/${token}`,{method: 'DELETE'})

  if (req.status !== 200) return alert('Nel')

  alert('Cuenta borrada')
  logOut()
}


function logOut() {
  document.cookie.split(";").forEach(function (cookie) {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  location.href = '/'
}
