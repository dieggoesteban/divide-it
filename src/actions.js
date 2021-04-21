import * as constants from "./constants";

//Participants

export const addParticipant = (participant) => ({
    type: constants.ADD_PARTICIPANT,
    payload: participant,
});

export const removeParticipant = (participant) => ({
    type: constants.REMOVE_PARTICIPANT,
    payload: participant,
});

export const updateParticipant = (participant) => ({
    type: constants.UPDATE_PARTICIPANT,
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

//Edit participant modal

export const showEditParticipantsModal = (participantToEdit) => ({
    type: constants.SHOW_EDIT_PARTICIPANT_MODAL,
    payload: participantToEdit,
});

export const hideEditParticipantsModal = () => ({
    type: constants.HIDE_EDIT_PARTICIPANT_MODAL,
});
