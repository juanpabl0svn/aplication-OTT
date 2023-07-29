const $ = (el) => document.querySelector(el)


$('#user').addEventListener('click',()=>{
  $('aside').classList.toggle('hidden')


})



function logOut() {
  document.cookie.split(";").forEach(function (cookie) {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  location.href = '/'
}
