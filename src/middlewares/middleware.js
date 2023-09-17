
exports.meuMiddleware = (request, response, next) => {
    next();
};


exports.checkCsrfError = (erro, req, resm, next) => {
    if(erro &&  'EBADCSRFTOKEN' === erro.code) {
        return resm.render('404')
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}