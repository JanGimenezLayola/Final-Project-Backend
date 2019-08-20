'use strict';

const express = require('express');

const router = express.Router();

const User = require('./../models/User');

const {
  isLoggedIn
  // isNotLoggedIn,
  // validationLoggin
} = require('../helpers/middlewares');

router.get('/getUsers', isLoggedIn(), async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/usersInTrip/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.find().populate('trips');
    const users = user.map((user) => {
      const tripsId = user.trips.map((trip) => {
        return trip._id;
      });
      if (tripsId.join() === id) {
        return user;
      }
    }
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
