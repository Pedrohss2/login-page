const express = require('express');
const route = express.Router();
const homePage = require('./controllers/homeController')

route.get('/', homePage.homePage)

module.exports = route