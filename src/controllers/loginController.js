const { response } = require('express');
const Login = require('../models/loginModel');

exports.index = (request, response) => {
    if(request.session.user) return response.render('logado')
    return response.render('login')
}

exports.cadastrar = (request, response) => {
   
    response.render('register');
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
        

        request.flash('success', 'Usuário criado com sucesso');
        request.session.user = login.user;
        request.session.save(function() {
            return response.redirect('/cadastrar/index')
        });

    } catch(error) {
        console.log(error)
        return response.render('404')
    }
}



exports.login = async function(request, response) {
    try {
        const login = new Login(request.body);
        await login.login();


        if(login.erros.length > 0) {
            request.flash('errors', login.erros)
            request.session.save(function() {
                return response.redirect('/login/index')
            });
            return;
        }
        

        request.flash('success', 'Usuário entrou no sistema');
        request.session.user = login.user;
        request.session.save(function() {
            return response.redirect('/login/index')
        });

    } catch(error) {
        console.log(error)
        return response.render('404')
    }
}



exports.logout = function(request, response) {
    request.session.destroy();
    response.redirect('/')
}
