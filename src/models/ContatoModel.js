const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
const validator = require('validator');


const ContatoSchema  = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false,default: ''},
    email: { type: String, required: false, default: ''},
    telefone: { type: String, required: false, default: '' },
    date: {type: Date, default: Date.now}
});

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;

}


Contato.prototype.register =  async function() {
    try {
        this.validate();

        if(this.errors.length > 0) return;
        this.contato = await ContatoModel.create(this.body);
    }
    catch(error) {
        console.log(error)
    }
   
};

Contato.prototype.validate = function() {
    this.cleanUp();
    
    if(this.body.email && !validator.isEmail(this.body.email)) this.erros.push('E-mail inválido');
    if(!this.body.nome) this.errors.push('Nome é obrigatorio');
    if(!this.body.email && !this.body.telefone ) {
        this.errors.push('Um contato precisa ser enviado')
    }
}

Contato.prototype.cleanUp = function() {
    for(const key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone
    };
}

Contato.prototype.edit = async function(id) {
    this.validate();
    if(typeof id !== 'string') return;
    
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })

};


Contato.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.buscaContatos = async function() {
    const contatos = await ContatoModel.find()
    .sort({ date: -1 });
    return contatos;
}

Contato.delete = async function(id) {
    if(typeof id !== 'string') return;
    const contato = await ContatoModel.findByIdAndDelete(id);
    return contato;
}


const ContatoModel = mongoose.model('Contato', ContatoSchema);

module.exports = Contato;
