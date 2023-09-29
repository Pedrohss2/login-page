export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init(){
        this.events();
    }

    events() {
        if(!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target;
        const email = el.querySelector('input[name="email"]');
        const password = el.querySelector('input[name="password"]');    
        const error = false;

        if(!this.validator.isEmail(email.value)) {
            alert('Email invalido')
            error = true;
        }

        if(password.value.length < 3 || password.value.length > 50) {
            alert('Senha precisa ter entre 3 a 50 caracteres');
        }

        console.log(password.value)
    }
}