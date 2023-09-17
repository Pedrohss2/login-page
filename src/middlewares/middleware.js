
exports.meuMiddleware = (request, response, next) => {
    next();
};


exports.checkCsrfError = (erro, req, resm, next) => {
    if(erro) {
        return resm.render('404')
    }
    
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}