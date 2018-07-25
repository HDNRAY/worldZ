const indexRouter = require('./index')
const loginRouter = require('./login')
const usersRouter = require('./users')

const router = app => {
    app.use('/', indexRouter)
    app.use('/user', usersRouter)
    app.use('/login', loginRouter)
    return app
}

module.exports = router;
