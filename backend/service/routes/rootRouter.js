const loginRouter = require('./login')
const usersRouter = require('./users')
const characterRouter = require('./character')

const router = app => {
    app.use('/user', usersRouter)
    app.use('/auth', loginRouter)
    app.use('/character', characterRouter)
    return app
}

module.exports = router;