import * as constants from "./constants";
import { combineReducers } from "redux";

const participantInitialState = [
    {
        id: 1,
        name: "Diego",
        monto: 1550,
    },
    {
        id: 2,
        name: "Mayra",
        monto: 2300,
    },
];

export const participantReducer = (state = participantInitialState, action = {}) => {
    switch (action.type) {
        case constants.ADD_PARTICIPANT:
            return [...state, action.payload];
        case constants.CLEAR_PARTICIPANTS:
            return [];
        default:
            return state;
    }
};

export const idCounterReducer = (state = 3, action = {}) => {
    switch (action.type) {
        case constants.INCREMENT_IDCOUNTER:
            return state + 1;
        case constants.RESET_IDCOUNTER:
            return 3;
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    idCounter: idCounterReducer,
    participants: participantReducer,
});

export default rootReducer;
