import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
	onStateChange: (state => {
		console.log('gear', state.gear.toJS())
		console.log('inventory', state.inventory.toJS())
	})
});

// 2. Plugins
// app.use({});

// 3. Model
const models = ['game', 'character', 'information', 'map', 'gear', 'inventory'];
models.map(name => app.model(require('./models/' + name).default))
// app.model(require('./models/game').default);
// app.model(require('./models/character').default);
// app.model(require('./models/information').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');