const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/user/main', ensureLoggedIn(), (req, res) => {
  res.render('user/main'
  // {
  //   restaurants,
  //   restStr: JSON.stringify(restaurants),
  //   message: req.flash('error')
  // }
  
  );
});


// //LISTADO DE EVENTOS
// router.get('/', (req, res, next) => {
//   Restaurant.find().then( restaurants => {
//     res.render('restaurant/list', {
//       restaurants,
//       restStr: JSON.stringify(restaurants)
//     });
//   }).catch(e=> next(e));
// });


module.exports = router;