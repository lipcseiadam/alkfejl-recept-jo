'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Recipe = use('App/Model/Recipe')
const User = use('App/Model/User')
const Validator = use('Validator')

class RecipeController {
  * index(request, response) {
    // const categories = yield Database.from('categories').select('*')
    // response.send(categories)
    const categories = yield Category.all()

    for (let category of categories) {
      const topRecipes = yield category.recipes().limit(3).fetch()
      category.topRecipes = topRecipes.toJSON()
    }

    yield response.sendView('main', {
      categories: categories.toJSON()
    }) 
  }

  * create(request, response) {
    const categories = yield Category.all();

    yield response.sendView('createRecipe', {
      categories: categories.toJSON()
    });
  }

  * doCreate(request, response) {
    const recipeData = request.except('_csrf');
    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required'
    }
    const validation = yield Validator.validateAll(recipeData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    recipeData.user_id = request.currentUser.id
    yield Recipe.create(recipeData);

    response.redirect('/');
  }

  * show(request, response) {
    const id = request.param('id')
    const recipe = yield Recipe.find(id)
    if (!recipe) {
      response.notFound('Recipe does not exist')
      return
    }
    yield recipe.related('category').load()
    yield response.sendView('showRecipe', {
      recipe: recipe.toJSON()
    })
  }

  * edit(request, response) {
    const id = request.param('id')
    const recipe = yield Recipe.find(id)

    if (request.currentUser.id !== recipe.user_id) {
      response.unauthorized('Nincs jog')
      return
    }

    const categories = yield Category.all();

    console.log(recipe.toJSON())

    yield response.sendView('editRecipe', {
      categories: categories.toJSON(),
      recipe: recipe.toJSON(),
    });
  }

  * doEdit(request, response) {
    const recipeData = request.except('_csrf');
    const rules = {
      name: 'required',
      ingredients: 'required',
      instructions: 'required',
      category_id: 'required'
    }
    const validation = yield Validator.validateAll(recipeData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id')
    const recipe = yield Recipe.find(id)

    if (request.currentUser.id !== recipe.user_id) {
      response.unauthorized()
      return
    }

    recipe.name = recipeData.name
    recipe.ingredients = recipeData.ingredients
    recipe.instructions = recipeData.instructions
    recipe.category_id = recipeData.category_id

    yield recipe.save()

    response.redirect('/');
  }

  * doDelete(request, response) {
    const id = request.param('id')
    const recipe = yield Recipe.find(id)
    if (!recipe) {
      response.notFound('Recipe does not exist')
      return
    }
    yield recipe.delete()
    response.redirect('/');
  }

  * search (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      recipeName: request.input('recipeName') || '',
      category: request.input('category') || 0,
      createdBy: request.input('createdBy') || 0
    }

    const recipes = yield Recipe.query()
      .where(function () {
        if (filters.category > 0) this.where('category_id', filters.category)
        if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
        if (filters.recipeName.length > 0) this.where('name', 'LIKE', `%${filters.recipeName}%`)
      })
      .with('user')
      .paginate(page, 9)

    const categories = yield Category.all()
    const users = yield User.all()

    yield response.sendView('recipeSearch', {
      recipes: recipes.toJSON(),
      categories: categories.toJSON(),
      users: users.toJSON(),
      filters
    })
  }

}

module.exports = RecipeController
