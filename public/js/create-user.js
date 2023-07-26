const $ = (el) => document.querySelector(el)


$('form').addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target))
  console.log(data)
})