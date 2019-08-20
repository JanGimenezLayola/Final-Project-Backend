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
    const activity = await Activity.findById(id);
    console.log(activity);
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
});

router.put('/updateActivity/:id', isLoggedIn(), async (req, res, next) => {
  console.log('BODY ', req.body);

  try {
    const { id } = req.params;
    const activityUpdated = req.body;
    const activity = await Activity.findByIdAndUpdate(id, activityUpdated, { new: true });
    console.log(activity);
    res.status(200).json(activity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
