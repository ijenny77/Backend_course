const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const Recipe = require('../models/Recipe')

router.get("/",auth,async(req,res)=>{
    const myRecipe = await Recipe.find({userId:req.user.id})
    res.json(myRecipe)
})

router.post('/',auth,async(req,res)=>{
    const {title,ingredients,instructions,cookingTime} = req.body
    const newRecipe = new Recipe({title,ingredients,instructions,cookingTime,userId:req.user.id})
    await newRecipe.save()
    res.json(newRecipe)
})

router.put("/:id",auth,async(req,res)=>{
    const id = req.params.id
    const recipe = await Recipe.findById(id)
    if(!recipe){
        return res.status(404).send("Recipe not found")
    }
    const isMatch = recipe.userId.toString() === req.user.id.toString()
    if(!isMatch){
        return res.status(403).send("Not allowed to modify the recipe")
    }
    const {title,ingredients,instructions,cookingTime} = req.body
    recipe.title = title,
    recipe.ingredients = ingredients,
    recipe.instructions = instructions,
    recipe.cookingTime = cookingTime
    await recipe.save()
    res.json(recipe)
})

router.delete("/:id",auth,async(req,res)=>{
    const id = req.params.id
    const recipe =await Recipe.findById(id)
    if(!recipe){
        return res.status(404).send('Recipe not Found')
    }
    const isMatch = recipe.userId.toString() === req.user.id.toString() 
    if(!isMatch){
        return res.status(403).send('Not allowed')
    }
    await Recipe.findByIdAndDelete(id)
    res.send("Recipe deleted successfully ")
})

module.exports = router