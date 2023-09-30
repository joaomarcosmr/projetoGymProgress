const Login = require('../models/LoginModels')

exports.indexRegister = (req, res) => {
    res.render('register')
}

exports.indexLogin = (req, res) => {
    res.render('login')
}

exports.register = async (req, res) => {
    try{
        const user = new Login(req.body)
        await user.register()
        
        if(user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(function() {
              return res.redirect('/login/register');
            });
            return;
          }
      
            req.flash('success', 'Seu usuário foi criado com sucesso.');
            req.session.save(function() {
            return res.redirect('/login/register');
        });
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.login = async (req, res) => {
    try{
        const user = new Login(req.body)
        await user.login()
        
        if(user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(function() {
              return res.redirect('/login/index');
            });
            return;
          }
      
         req.flash('success', 'Você acessou o sistema!');
         req.session.user = user.user
         req.session.save(function(){
            return res.redirect('/');
         })


    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
