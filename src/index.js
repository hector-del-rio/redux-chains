/**
 * Calls all reducers passed by parameter one by one from left to right. For each call, the returned
 * state is shallow-compared to the previous one. If the object has changed this will be merged to
 * the previous one. Otherwise, the state object reference will be kept.
 *
 * e.g.:
 *          return chainReducers(
 *              childComponentReducerA,
 *              childComponentReducerB,
 *          )(state, action);
 *
 * @returns {Function} The new reducer function that chains all the others.
 */
export default function chainReducers(...reducers) {

    return function chained(state = {}, action) {

        for (let i = 0; i < reducers.length; i++) {
            const reducer = reducers[i];

            if (typeof reducer !== 'function') {
                throw 'chainReducers only accepts reducer functions as arguments';
            }

            const nextState = reducer(state, action);

            if (typeof nextState === 'undefined') {
                console.warn(
                    `Given action ${action.type}, reducer "${i}" returned undefined. ` +
                    `To ignore an action, you must explicitly return the previous state. ` +
                    `If you want this reducer to hold no value, you can return null instead of undefined.`
                );
            }

            if (nextState !== state) {
                state = {
                    ...state,
                    ...nextState,
                };
            }
        }

        return state;
    }
}