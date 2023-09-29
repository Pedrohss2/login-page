const { async } = require('regenerator-runtime');
const Contato = require('../models/ContatoModel');

exports.index = async (request, resoponse) => {
    const contatos = await Contato.buscaContatos();
    resoponse.render('index', { contatos })
    return;   
}
