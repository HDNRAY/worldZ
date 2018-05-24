'user strict'

export const getReachables = ({ origin, movement }) => {
    const reachables = {};
    // let lastPoints = [this.origin]
    let lastSteps = [origin];
    for (let step = 0; step < movement; step++) {
        lastSteps = lastSteps.reduce((nextSteps, lastStep) => {
            let directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
            directions = lastStep.y % 2 ? [...directions, [1, 1], [1, -1]] : [...directions, [-1, 1], [-1, -1]];
            directions.forEach(direction => {

                const nextStep = {
                    x: lastStep.x + direction[0],
                    y: lastStep.y + direction[1],
                };
                const nextStepString = JSON.stringify(nextStep);

                if (!(nextStepString in reachables)) {
                    nextSteps.push(nextStep);
                    reachables[nextStepString] = lastStep;
                }
            });
            return nextSteps;
        }, []);
    }
    return reachables;
}

export const getPaths = ({ origin, reachables, destination }) => {
    if (!destination | !reachables) {
        console.log('param is invalid');
        return;
    }

    const findLastStep = (step, path) => {
        path.unshift(step);
        if (JSON.stringify(step) === JSON.stringify(origin)) {
            return path
        }
        return findLastStep(reachables[JSON.stringify(step)], path)
    };
    return findLastStep(destination, []);
}

export const getAttackables = ({ origin, min = 0, max }) => {
    const attackableSet = new Set()

    let lastSteps = [origin];
    for (let step = 0; step < max; step++) {
        lastSteps = lastSteps.reduce((nextSteps, lastStep) => {
            let directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
            directions = lastStep.y % 2 ? [...directions, [1, 1], [1, -1]] : [...directions, [-1, 1], [-1, -1]];
            directions.forEach(direction => {

                const nextStep = {
                    x: lastStep.x + direction[0],
                    y: lastStep.y + direction[1],
                };
                const nextStepString = JSON.stringify(nextStep);

                if (!attackableSet.has(nextStepString)) {
                    nextSteps.push(nextStep);
                    if (step + 1 >= min) attackableSet.add(nextStepString)
                }
            });
            return nextSteps;
        }, []);
    }

    return [...attackableSet]
}
