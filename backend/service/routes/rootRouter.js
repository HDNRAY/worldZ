const loginRouter = require('./login')
const usersRouter = require('./users')
const characterRouter = require('./character')
const gearRouter = require('./gear')
const itemRouter = require('./item')

const router = app => {
    app.use('/user', usersRouter)
    app.use('/auth', loginRouter)
    app.use('/character', characterRouter)
    app.use('/gear', gearRouter)
    app.use('/item', itemRouter)
    return app
}

module.exports = router;