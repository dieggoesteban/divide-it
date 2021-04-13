import { ADD_PARTICIPANT } from "./constants";

const initialParticipantsState = {
  participants: [],
};

export const addParticipant = (state = initialParticipantsState, action = {}) => {
  switch (action.type) {
    case ADD_PARTICIPANT:
      return Object.assign({}, state, { participants: action.payload });
    default:
      return state;
  }
};
