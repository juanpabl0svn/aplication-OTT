fetch('http://localhost:5000/db.json')
.then(res => res.json())
.then(res => console.log(res))