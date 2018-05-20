import Immutable from 'immutable';

export default {

    namespace: 'scene',

    state: Immutable.Map({
        clicked: {
            x: -1,
            y: -1
        },
        moveables: {},
        attackables: new Map(),
        terrain: new Set(),
        enemies: new Set(),
        character: {
            movement: 4,
            coordinate: {
                x: 7, y: 7
            }
        }
    }),

    subscriptions: {
        setup({ dispatch, history }) { // eslint-disable-line
        },
    },

    effects: {
        * fetch({ payload }, { call, put }) { // eslint-disable-line
            yield put({
                type: 'save'
            });
        },
    },

    reducers: {

        showMoveables: (state, { payload }) => {
            const character = state.get('character')
            const movement = character.movement
            const origin = character.coordinate

            const moveables = {}
            let lastSteps = [origin];
            for (let step = 0; step < movement; step++) {
                lastSteps = lastSteps.reduce((nextSteps, lastStep) => {
                    let directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
                    directions = lastStep.y % 2 ? [...directions, [1, 1], [1, -1]] : [...directions, [-1, 1], [-1, -1]];
                    directions.map(direction => {
                        let nextStep = {
                            x: lastStep.x + direction[0],
                            y: lastStep.y + direction[1],
                        };
                        if (!(nextStep in moveables)) {
                            nextSteps.push(nextStep);
                            moveables[nextStep] = lastStep;
                        }
                        // return null
                    });
                    return nextSteps;
                }, []);
            }
            console.log(moveables)
            return state.set('moveables', moveables)
        }
    },

};