'use strict';

const express = require('express');
// const createError = require('http-errors');

const router = express.Router();

// const User = require('./../models/User');
// const Trip = require('./../models/Trip');
const User = require('./../models/User');
const Activity = require('./../models/Activity');

const {
  isLoggedIn
  // isNotLoggedIn,
  // validationLoggin
} = require('../helpers/middlewares');

router.get('/oneActivity/:id', isLoggedIn(), async (req, res, next) => {
  console.log('Hello BACKEND -------------');

  console.log('PARAAAAAAAAMS ', req.params);
  try {
    const { id } = req.params;
    const activitiesList = await Activity.findById(id);
    const activity = activitiesList.filter((activity) => {
      console.log('ID ----->', id);

      if (activity._id == id) {
        return activity;
      } else {
        console.log('Not Found');
      }
    });
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
