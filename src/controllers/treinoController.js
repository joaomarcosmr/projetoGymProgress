const Treino = require('../models/TreinoModel')

exports.progresso = async function(req, res){
    const treino = await Treino.buscaTreinos()
    res.render('progresso', { treino })
}

exports.progressoTreino = async function(req, res){
    const treino = await Treino.buscaTreinosId(req.params.id)
    res.render('progressoTreino', { treino })
}

exports.index = async function(req, res){
    const treino = await Treino.buscaTreinos()
    res.render('progressoRegister', { treino })
}

exports.delete = async function(req, res){
    if(!req.params.id) return res.render('404')

    const treino = await Treino.delete(req.params.id)

    if(!treino) return res.render('404')

    req.flash('success', 'Treino apagado com sucesso.')
    req.session.save(() => {
        res.redirect('/treinos/progresso')
    })
}

exports.register = async (req, res) => {
    try{
        const treino = new Treino(req.body)
        await treino.register()
    
        if (treino.errors.length > 0){
            req.flash('errors', treino.errors)
            req.session.save(() => res.redirect('/treinos/register'))
            return;
        }
    
        req.flash('success', 'Treino registrado com sucesso!')
        req.session.save(() => res.redirect('/treinos/register'))
        return;
    } catch(e){
        console.log(e)
        res.render('404')
    }
    
}

exports.registerTreino = async (req, res) => {
    try{
        const treino = new Treino(req.body)
        await treino.register()
    
        if (treino.errors.length > 0){
            req.flash('errors', treino.errors)
            req.session.save(() => res.redirect('/treinos/register'))
            return;
        }
    
        req.flash('success', 'Treino registrado com sucesso!')
        req.session.save(() => res.redirect('/treinos/register'))
        return;
    } catch(e){
        console.log(e)
        res.render('404')
    }
    
}

exports.registerEdit = async function(req, res){
    if(!req.params.id) return res.render('404')

    const treino = await Treino.buscaPorId(req.params.id)

    if(!treino){
        return res.render('404')
    }

    res.render('editTreino', { treino })
}

exports.update = async function(req, res){
    try {
        if(!req.params.id) return res.render('404');
        const treino = new Treino(req.body);
        await treino.update(req.params.id);
    
        if(treino.errors.length > 0) {
          req.flash('errors', treino.errors);
          req.session.save(() => res.redirect('back'));
          return;
        }
    
        req.flash('success', 'treino editado com sucesso.');
        req.session.save(() => res.redirect('/treinos/progresso'));
        return;
      } catch(e) {
        console.log(e);
        res.render('404');
      }
}