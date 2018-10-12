import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
    onStateChange: (state => {

    })
});

// 2. Plugins
// app.use({});

// 3. Model
const models = ['game', 'user', 'character', 'information', 'inventory',
    'ability', 'scene', 'menu', 'instance', 'gear'];
models.map(name => app.model(require('./models/' + name).default))

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');