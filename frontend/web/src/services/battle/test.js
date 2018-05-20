const MovePaths = require('./movePaths')

const movePaths = new MovePaths({ x: 10, y: 10 }, 2)

console.log('reachables', movePaths.getReachables())
const reachables = movePaths.getReachables();
for (let key of reachables.keys()){
	console.log(key,':', movePaths.getPaths(key))
}