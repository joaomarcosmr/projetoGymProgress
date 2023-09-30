const mongoose = require('mongoose')

const TreinoSchema = new mongoose.Schema({
    letra: { type: String, required: true },
    grupo: { type: String, required: true },
    Ex1: { type: String }, rep1: { type: String }, prEx1: { type: String }, rmEx1: { type: String },
    Ex2: { type: String }, rep2: { type: String }, prEx2: { type: String }, rmEx2: { type: String },
    Ex3: { type: String }, rep3: { type: String }, prEx3: { type: String }, rmEx3: { type: String },
    Ex4: { type: String }, rep4: { type: String }, prEx4: { type: String }, rmEx4: { type: String },
    Ex5: { type: String }, rep5: { type: String }, prEx5: { type: String }, rmEx5: { type: String },
    Ex6: { type: String }, rep6: { type: String }, prEx6: { type: String }, rmEx6: { type: String },
    Ex7: { type: String }, rep7: { type: String }, prEx7: { type: String }, rmEx7: { type: String },
    Ex8: { type: String }, rep8: { type: String }, prEx8: { type: String }, rmEx8: { type: String },
    criadoEm: { type: Date, default: Date.now },
})

const TreinoModel = mongoose.model('Treino', TreinoSchema)

class Treino{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.treino = null;
    }

    static async buscaPorId(id){
        if (typeof id !== 'string') return
        const treino = await TreinoModel.findById(id)
        return treino
    }

    static async buscaTreinos(){
        const treinos = await TreinoModel.find().sort({ letra: 1 })
        return treinos
    }

    static async buscaTreinosId(id){
        const treinos = await TreinoModel.find({ _id: id })
        return treinos
    }

    static async delete(id){
        if (typeof id !== 'string') return
        const treino = await TreinoModel.findOneAndDelete({ _id: id })
        return treino
    }

    async update(id){
        if (typeof id !== 'string') return
        this.cleanUp()
        this.treino = await TreinoModel.findOneAndUpdate({ _id: id }, this.body, { new: true })
    }

    async register(){
        this.valida()

        if(this.errors.length > 0) return;

        this.treino = await TreinoModel.create(this.body)
    }

    valida(){
        this.cleanUp()
        
        if (!this.body.letra || !this.body.grupo) this.errors.push('Os campos são obrigatórios!')

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
            letra: this.body.letra.value,
            grupo: this.body.grupo, 
            Ex1: this.body.ex1, rep1: this.body.rep1, prEx1: this.body.prEx1, rmEx1: this.body.rmEx1,
            Ex2: this.body.ex2, rep2: this.body.rep2, prEx2: this.body.prEx2, rmEx2: this.body.rmEx2,
            Ex3: this.body.ex3, rep3: this.body.rep3, prEx3: this.body.prEx3, rmEx3: this.body.rmEx3,
            Ex4: this.body.ex4, rep4: this.body.rep4, prEx4: this.body.prEx4, rmEx4: this.body.rmEx4,
            Ex5: this.body.ex5, rep5: this.body.rep5, prEx5: this.body.prEx5, rmEx5: this.body.rmEx5,
            Ex6: this.body.ex6, rep6: this.body.rep6, prEx6: this.body.prEx6, rmEx6: this.body.rmEx6,
            Ex7: this.body.ex7, rep7: this.body.rep7, prEx7: this.body.prEx7, rmEx7: this.body.rmEx7,
            Ex8: this.body.ex8, rep8: this.body.rep8, prEx8: this.body.prEx8, rmEx8: this.body.rmEx8,
        }
    }
}

module.exports = Treino;