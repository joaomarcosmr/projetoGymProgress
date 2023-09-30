const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
    nome: { type: String, required: true }
})

const LoginModel = mongoose.model('login', LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async register() {
        this.valida()
        if(this.errors.length > 0) return

        await this.find()

        if(this.errors.length > 0) return
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
    
        this.user = await LoginModel.create(this.body);
    }

    async login(){
        this.valida()
        if(this.errors.length > 0) return

        this.user = await LoginModel.findOne({ email: this.body.email })
        if(!this.user) {
            this.errors.push('Usuário não existe')
            return
        }

        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }

    }

    async find(){
        this.user = await LoginModel.findOne({ email: this.body.email })
        if(this.user) this.errors.push('Usuário já existe')
    }

    valida(){
        this.cleanUp()
        if(!this.body.email || !validator.isEmail(this.body.email)){
            this.errors.push("O campo E-MAIL deve ser preenchido corretamente!")
        }
        if (this.body.senha.length < 3 || this.body.senha.length >= 20){
            this.errors.push('A senha deve conter entre 3 e 20 caracteres')
        }
        }

    cleanUp(){
        for (let key in this.body){
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
                return
            }
        return
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha,
            nome: this.body.nome
        }
    }
}

module.exports = Login