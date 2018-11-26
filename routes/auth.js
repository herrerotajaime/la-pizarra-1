const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//Insatancio el User aqui porque hacemos el Signup en 2 tandas
//const newUser = new User();

//funciones auxiliares

//var checkEmpty = () => arguments[0] === '';
function checkEmpty() { return arguments[0] === '' }

//COMO HAGO PARA QUE UNA FUNCIóN CAMBIE el 
//argumento sin return

// var hassPass = (password) => {
//   const salt = bcrypt.genSaltSync(bcryptSalt);
//   password = bcrypt.hashSync(password, salt);
// };


///INDEX
router.get('/info', (req, res, next) => {
  res.render('info');
});

router.get("/login", ensureLoggedOut(), (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//Slide

router.get("/subjects", (req, res, next) => {
  res.render("subjects");
});


///LOGIN
router.post("/login", passport.authenticate("local", {
  successRedirect: "./user/main",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/signup/", (req, res) => {
  res.redirect("auth/signupII");
});


///SIGN-UP
////Separar esto y mandarlo a mongo en el sign2
//Comprobar si puedo clonar es botones y que vayan para el mismo ladoooo
router.post("/signup", (req, res, next) => {

  if (Object.values(req.body).some(checkEmpty)) {
    res.render("auth/signup", { message: "Ninguno de los campos puede estar vacio" });
    return;
  }

  // const username = req.body.username;
  User.findOne({ username: req.body.username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    //hassPass(req.body.password);

    const newUser = new User(req.body);



    ////?????????????????????'
    //Intentando instanciarlo fuera
    //newUser(req.body); //assign
  


console.log(newUser)


    newUser.save()
      .then(() => {
        res.redirect("/signup/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  });
});




router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
