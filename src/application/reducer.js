import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

const initialState = fromJS({
    applicationVersion: 'from client 0.0.1'
});

const applicationReducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.APPLICATION_INIT_SUCCESS:
            return initialState;

        default:
            return initialState;
    }
};

export default applicationReducer;
