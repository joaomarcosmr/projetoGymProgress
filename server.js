require('dotenv').config()

const express= require('express')
const app = express();
const mongoose = require('mongoose')
const { middlewareGlobal, checkCsurfError, csrfMiddleware } = require('./src/middlewares/middleware')

mongoose.connect(process.env.CONNECTIONSTRING)
   .then(() => { // a connectionstring ta no .env
   console.log('conectei a base de dados...')
   app.emit('pronto!')
   })
   .catch(e => console.log(e))

const session = require('express-session') // salvar os dados de um navegador pra qnd ele voltar ao site
const MongoStore = require('connect-mongo') // salvar dados da sessao em uma base de dados para que nao acabe a memoria rapido
const flash = require('connect-flash') // mensagens autodestrutivas, feedbacks. São salvas em sessão (erro de formulario por exemplo)

 const routes = require('./routes') // rotas da aplicação (/home, /contato)
 const path = require('path') // para trabalhar com caminhos


 const helmet = require('helmet') // recomendação do express para segurança
const csurf = require('csurf') // sao tokens que criamos para formularios para melhorar segurança(nada externo posta coisas pra dentro da app)


app.use(helmet())
 app.use(express.urlencoded({ extended: true }))
 app.use(express.json())
 app.use(express.static(path.resolve(__dirname, 'public')))

 const sessionOptions = session({
   secret: 'joaomarcos',
   store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true
   }
 })
 app.use(sessionOptions)
 app.use(flash())

 app.set('views', path.resolve(__dirname, 'src', 'views'))
 app.set('view engine', 'ejs')
 
 app.use(csurf())
 app.use(middlewareGlobal);
 app.use(checkCsurfError)
 app.use(csrfMiddleware)
 app.use(routes)

app.on('pronto!', () => { // só vamos inicializar o servidor agora quando conseguir fazer conexão com o mongoDB
 app.listen(3000, () => { // passamos a porta pro express escutar (inicializar o servidor)
    console.log('Acessar http://localhost:3000')
    console.log('servidor executando na porta 3000')
 });
})