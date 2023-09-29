const { request, response } = require("express");

exports.meuMiddleware = (request, response, next) => {
    response.locals.errors = request.flash('errors');
    response.locals.success = request.flash('success');
    response.locals.user = request.session.user;
    next();
};


exports.checkCsrfError = (erro, req, res, next) => {
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (request, response, next) => {
    if(!request.session.user) {
        request.flash('errors', 'Usuario precisa estar logado');
        request.session.save(() => response.redirect('/'));
        return;
    }
    next();
} 