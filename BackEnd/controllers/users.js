const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async(request, response)=>{
    const users = await User.find({}).populate('notes',{content:1})
    response.json(users)
})

usersRouter.post('/', async(request, response)=>{

    // front end will send a request to ass this user, 
    const {username, name, password} = request.body
    const saltRounds =10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // we will add user to database, and encode password
    const user = new User({
        username, 
        name, 
        passwordHash,
    })

    // this saves it to mongodb
    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter