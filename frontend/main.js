import 'core-js/stable';
import 'regenerator-runtime/runtime';


import './assets/css/nav.css';
import './assets/css/style.css';

import './assets/css/register.css';

import Login from './modules/Login';


const login = new Login('.form-login')

login.init();
