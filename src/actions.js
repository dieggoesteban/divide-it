import { ADD_PARTICIPANT } from './constants';

export const addParticipant = (participant) => ({
    type: ADD_PARTICIPANT, 
    payload: participant
})