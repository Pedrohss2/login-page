const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');

const loginController = require('./src/controllers/loginController')

route.get('/', homeController.index)
// Rotas da home
route.get('/login/index', loginController.index);

route.get('/cadastrar/index', loginController.cadastrar);
route.post('/login/register', loginController.register);
module.exports = route;