const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const { async } = require('regenerator-runtime');

const LoginSchema  = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model('Home', LoginSchema);


class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }
 
    async login() {
        this.validate();
        if(this.erros.length > 0) return;
        this.user = await LoginModel.findOne( { email: this.body.email } );

        if(!this.user) {
            this.erros.push('Usuário ou senha inválidos');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.erros.push('Email ou senha invaĺidos');
            this.user = null;
            return; 
        };

     
    }

    async register() {
        this.validate();

        if(this.erros.length > 0) return;
        await this.userExists();

        if(this.body.password.length < 5) {
            this.erros.push('A senha precisa ter mais que 5 digitos'); 
        }

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body)
       
    }

    async userExists() {
        this.user =  await LoginModel.findOne( { email: this.body.email });

        const userExists = this.user ? this.erros.push("Usuário ou senha inválida"): '';
        return userExists;
    }

    validate() {
        this.cleanUp();
        
        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido');

        if(this.body.password.length < 3  || this.body.password.length > 50) {
            this.erros.push('A senha precisa ter entre 3 a 50 caracteres');
        }    
        
    }

    cleanUp() {
        for(const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }

}

module.exports = Login