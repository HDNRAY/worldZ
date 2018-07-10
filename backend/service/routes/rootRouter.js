import indexRouter from './index';
import usersRouter from './users';

const router = app => {
    app.use('/', indexRouter)
    app.use('/user', usersRouter)
    return app
}

export default router
