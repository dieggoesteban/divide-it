import * as constants from "./constants";
import { combineReducers } from "redux";

const participantInitialState = [];

export const participantReducer = (state = participantInitialState, action = {}) => {
    switch (action.type) {
        case constants.ADD_PARTICIPANT:
            return [...state, action.payload];
        case constants.UPDATE_PARTICIPANT:
            const editedParticipants = JSON.parse(JSON.stringify(state));
            let targetIndex = editedParticipants.findIndex((p) => p.id === action.payload.id);
            editedParticipants.splice(targetIndex, 1, action.payload);
            return editedParticipants;
        case constants.REMOVE_PARTICIPANT:
            return state.filter((p) => p.id !== action.payload.id);
        case constants.CLEAR_PARTICIPANTS:
            return [];
        default:
            return state;
    }
};

export const idCounterReducer = (state = 1, action = {}) => {
    switch (action.type) {
        case constants.INCREMENT_IDCOUNTER:
            return state + 1;
        case constants.RESET_IDCOUNTER:
            return 1;
        default:
            return state;
    }
};

const editParticipantModalInitialState = {
    showModal: false,
    targetParticipant: {},
};

export const editParticipantModal = (state = editParticipantModalInitialState, action = {}) => {
    switch (action.type) {
        case constants.SHOW_EDIT_PARTICIPANT_MODAL:
            return { showModal: true, targetParticipant: action.payload };
        case constants.HIDE_EDIT_PARTICIPANT_MODAL:
            return { showModal: false, targetParticipant: {} };
        default:
            return state;
    }
};

export const rootReducer = combineReducers({
    idCounter: idCounterReducer,
    participants: participantReducer,
    editParticipantModal: editParticipantModal,
});

export default rootReducer;
