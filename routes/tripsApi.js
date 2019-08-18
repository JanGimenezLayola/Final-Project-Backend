'use strict';

const express = require('express');
// const createError = require('http-errors');

const router = express.Router();

// const User = require('./../models/User');
const Trip = require('./../models/Trip');
const User = require('./../models/User');
const Activity = require('./../models/Activity');

const {
  isLoggedIn
  // isNotLoggedIn,
  // validationLoggin
} = require('../helpers/middlewares');

router.post('/add', isLoggedIn(), async (req, res, next) => {
  try {
    const newTrip = req.body;
    const createTrip = await Trip.create(newTrip);
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { $push: { trips: createTrip._id } });

    res.status(200).json(createTrip);
  } catch (error) {
    next(error);
  }
});

router.get('/view', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('trips');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/view/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId).populate('trips');
    const userTrip = user.trips.filter((trip) => {
      if (trip._id == id) {
        return trip;
      } else {
        console.log('Not Found');
      }
    });
    res.status(200).json(userTrip);
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    await Trip.findByIdAndDelete(id);
    res.status(200).json();
  } catch (error) {
    next(error);
  }
});

router.post('/addActivity/:id', isLoggedIn(), async (req, res, next) => {
  const body = req.body;
  const newActivity = await Activity.create({
    name: body.object.name,
    date: body.object.date
  });
  console.log('-----------ID---------', body.object.id);
  console.log('-----------ACTIVITY---------', newActivity);
  try {
    const response = await Trip.findOneAndUpdate(body.object.id, { $push: { activities: newActivity._id } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get('/viewActivities/:id', isLoggedIn(), async (req, res, next) => {
  console.log('------------viewActivities----------------');

  try {
    const { id } = req.params;
    const response = await Trip.findById(id).populate('activities');
    console.log(response);
    res.status(200).json(response);
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
