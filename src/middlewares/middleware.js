
exports.meuMiddleware = (request, response, next) => {
    next();
};


exports.checkCsrfError = (erro, req, res, next) => {
    if(erro) {
        return res.render('404')
    }
    
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}