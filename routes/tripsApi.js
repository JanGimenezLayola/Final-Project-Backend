'use strict';

const express = require('express');
// const createError = require('http-errors');

const router = express.Router();

// const User = require('./../models/User');
const Trip = require('./../models/Trip');

const {
  isLoggedIn
  // isNotLoggedIn,
  // validationLoggin
} = require('../helpers/middlewares');

router.post('/add', isLoggedIn(), async (req, res, next) => {
  try {
    console.log('hi backend', req.body);
    const newTrip = req.body;
    const createTrip = Trip.create(newTrip);
    res.status(200).json(createTrip);
  } catch (error) {
    next(error);
  }
});

// router.post(
//   '/login',
//   isNotLoggedIn(),
//   validationLoggin(),
//   async (req, res, next) => {
//     const { email, password } = req.body;
//     console.log(req.body);
//     try {
//       const user = await User.findOne({ email });
//       console.log(user);
//       if (!user) {
//         next(createError(404));
//       } else if (bcrypt.compareSync(password, user.password)) {
//         req.session.currentUser = user;
//         return res.status(200).json();
//       } else {
//         next(createError(401));
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post(
//   '/signup',
//   isNotLoggedIn(),
//   validationLoggin(),
//   async (req, res, next) => {
//     const { email, password } = req.body;
//     console.log(req.body);

//     try {
//       const emailfind = await User.findOne({ email }, 'email');
//       if (emailfind) {
//         return next(createError(422));
//       } else {
//         const salt = bcrypt.genSaltSync(10);
//         const hashPass = bcrypt.hashSync(password, salt);
//         const newUser = await User.create({ password: hashPass, email });
//         req.session.currentUser = newUser;
//         res.status(200).json(newUser);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post('/logout', isLoggedIn(), (req, res, next) => {
//   req.session.destroy();
//   return res.status(204).send();
// });

// router.get('/private', isLoggedIn(), (req, res, next) => {
//   res.status(200).json({
//     message: 'This is a private message'
//   });
// });

module.exports = router;
