const { response } = require('express');
const Login = require('../models/loginModel');

exports.index = (request, response) => {
    response.render('login')
}

exports.register = async function(request, response) {
    try {
        const login = new Login(request.body);
        await login.register();


        if(login.erros.length > 0) {
            request.flash('errors', login.erros)
            request.session.save(function() {
                return response.redirect('/cadastrar/index')
            });
            return;
        }
        

        request.flash('success', 'Usuário criado com sucesso')
        request.session.save(function() {
            return response.redirect('/cadastrar/index')
        });

    } catch(error) {
        console.log(error)
        return response.render('404')
    }
}

exports.cadastrar = (request, response) => {
    response.render('register');
}