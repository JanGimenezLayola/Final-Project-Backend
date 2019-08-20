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

module.exports = router;
