const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const treinoController = require('./src/controllers/treinoController')
const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', (homeController.paginaInicial))

// Rotas Login
route.get('/login/index', (loginController.indexLogin))
route.post('/login/index', (loginController.login))
route.get('/login/logout', (loginController.logout))

// Rotas registro
route.get('/login/register', (loginController.indexRegister))
route.post('/login/register', (loginController.register))

// Rotas Treinos
route.get('/treinos/progresso', (loginRequired), (treinoController.progresso))
route.get('/treinos/progresso/:id', (loginRequired), (treinoController.progressoTreino))
route.get('/treinos/register', (loginRequired), (treinoController.index))
route.get('/treinos/update/:id', (loginRequired), (treinoController.registerEdit))
route.post('/treinos/update/:id', (loginRequired), (treinoController.update))
route.post('/treinos/register', (loginRequired), (treinoController.register))
route.get('/treinos/delete/:id', (loginRequired), (treinoController.delete))


module.exports = route;