const indexRouter = require('./index')
const loginRouter = require('./login')
const usersRouter = require('./users')
const characterRouter = require('./character')

const router = app => {
    app.use('/', indexRouter)
    app.use('/user', usersRouter)
    app.use('/login', loginRouter)
    app.use('/character', characterRouter)
    return app
}

module.exports = router;
