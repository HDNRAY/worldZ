'user strict'

module.exports = class MovePaths {
    constructor(origin, movement) {
        this.origin = origin;
        this.movement = movement;
        this.unreachables = [];
        this.reachables = null;
    }

    setTerrains(terrains) {
        this.unreachables.push(terrains);
        return this;
    }

    setEnemies(enemies) {
        this.unreachables.push(enemies);
        return this;
    }

    getReachables() {
        const reachables = new Map();
        // let lastPoints = [this.origin]
        let lastSteps = [this.origin];
        for (let step = 0; step < this.movement; step++) {
            lastSteps = lastSteps.reduce((nextSteps, lastStep) => {
                let directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
                directions = lastStep.y % 2 ? [...directions, [1, 1], [1, -1]] : [...directions, [-1, 1], [-1, -1]];
                directions.forEach(direction => {
                    let nextStep = {
                        x: lastStep.x + direction[0],
                        y: lastStep.y + direction[1],
                    };
                    if (!reachables.has(nextStep)) {
                        nextSteps.push(nextStep);
                        reachables.set(nextStep, lastStep);
                    }
                });
                return nextSteps;
            }, []);
        }
        this.reachables = reachables;
        return this.reachables;
    }

    getPaths(destination) {
        if (!destination) {
            console.log('destination is invalid');
            return;
        }

        if (!this.reachables)
            this.reachables = this.getReachables();

        const findLastStep = (step, path) => {
            path.unshift(step);
            if (step === this.origin) {
                return path;
            }
            step = this.reachables.get(step);
            return findLastStep(step, path);
        };
        
        return findLastStep(destination, []);
    }
}