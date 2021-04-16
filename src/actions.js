import * as constants from "./constants";

//Participants

export const addParticipant = (participant) => ({
    type: constants.ADD_PARTICIPANT,
    payload: participant,
});

export const clearParticipants = () => ({
    type: constants.CLEAR_PARTICIPANTS,
});

//Counter

export const incrementIdCounter = () => ({
    type: constants.INCREMENT_IDCOUNTER,
});

export const resetIdCounter = () => ({
    type: constants.RESET_IDCOUNTER,
});
