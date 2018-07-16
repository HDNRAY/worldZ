const indexRouter = require('./index')
const usersRouter = require('./users')

const router = app => {
    app.use('/', indexRouter)
    app.use('/user', usersRouter)
    return app
}

module.exports = router;
