const { Router } = require("express");
const path = require("path");

const router = Router();

// router.use((req,res,next) => {
//   let usuario = 'vanegas'
//   if (usuario === 'juan'){
//     return next()
//   }
//   return res.send('registrate por fa')
// });

// Obtengo peliculas
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,'..','pages','landing.html'))
});

module.exports = router;
