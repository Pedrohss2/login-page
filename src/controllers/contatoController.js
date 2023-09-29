
const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel')
exports.index = (request, response) => {
    response.render('contato', {
        contato: {}
    })
}

exports.register = async (request, response) => {
    try {
        const contato = new Contato(request.body);
        await contato.register();
    
        if( contato.errors.length > 0 ){
            request.flash('errors', contato.errors);
            request.session.save(() => response.redirect('/contato/index'));
            return;
        }
    
        request.flash('success', 'Contato registado com sucesso');
        request.session.save(() => response.redirect(`/contato/index/${contato.contato._id}`));
        return;
    }
    catch(error) {
        console.log(error)
        return response.render('404')
    }
    
}

exports.editIndex = async function(request, response) {
    if(!request.params.id) return response.render('404');
    const contato = await Contato.buscaPorId(request.params.id);

    if(!contato) return response.render('404')
    response.render('contato', { contato })
}

exports.edit = async function(request, response) {
    try {
        if(!request.params.id) return response.render('404');

        const contato =  new Contato(request.body);
        await contato.edit(request.params.id);
    
     
        if( contato.errors.length > 0 ){
            request.flash('errors', contato.errors);
            request.session.save(() => response.redirect('back'));
            return;
        }
    
        request.flash('success', 'Contato editado com sucesso');
        request.session.save(() => response.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } 
    catch(error) {
        response.render('404');
        console.log(error)
    }
   
}

exports.delete = async function(request, response) {
    try {
        if(!request.params.id) return response.render('404');
        const contato = await Contato.delete(request.params.id);

        if(!contato) return response.render('404');

        request.flash('success', 'O contato foi apagado com sucesso');
        request.session.save(() => response.redirect('/'))
        return;
    }
    catch(error) {
        console.log(error)
        response.render('404')
    }
    
}