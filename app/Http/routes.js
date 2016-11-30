'use strict'

const Route = use('Route')

// Route.on('/').render('welcome')
// Route.on('/').render('main')
// Route.get('/', function * (request, response) {
//     yield response.sendView('main');
// });
Route.get('/', 'RecipeController.index')
Route.get('/recipes/create', 'RecipeController.create').middleware('auth')
Route.post('/recipes/create', 'RecipeController.doCreate').middleware('auth')
Route.get('/recipes/:id', 'RecipeController.show')
Route.get('/recipes/:id/edit', 'RecipeController.edit').middleware('auth')
Route.post('/recipes/:id/edit', 'RecipeController.doEdit').middleware('auth')
Route.get('/recipes/:id/delete', 'RecipeController.doDelete').middleware('auth')
// Route.delete('/recipes/:id', 'RecipeController.doDelete')
Route.get('/recipes', 'RecipeController.search')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')