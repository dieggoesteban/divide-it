import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Participant } from '@/core/participants';

interface ParticipantsState {
  participants: Participant[];
  idCounter: number;
}

type Action =
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'UPDATE_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: { id: string } }
  | { type: 'CLEAR_PARTICIPANTS' }
  | { type: 'INCREMENT_ID_COUNTER' }
  | { type: 'RESET_ID_COUNTER' };

const initialState: ParticipantsState = {
  participants: [],
  idCounter: 1,
};

const participantsReducer = (state: ParticipantsState, action: Action): ParticipantsState => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return { ...state, participants: [...state.participants, action.payload] };
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((p) => p.id !== action.payload.id),
      };
    case 'CLEAR_PARTICIPANTS':
      return { ...state, participants: [] };
    case 'INCREMENT_ID_COUNTER':
      return { ...state, idCounter: state.idCounter + 1 };
    case 'RESET_ID_COUNTER':
      return { ...state, idCounter: 1 };
    default:
      return state;
  }
};

const ParticipantsContext = createContext<{
  state: ParticipantsState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const ParticipantsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(participantsReducer, initialState);

  return (
    <ParticipantsContext.Provider value={{ state, dispatch }}>
      {children}
    </ParticipantsContext.Provider>
  );
};

export const useParticipants = () => {
  const context = useContext(ParticipantsContext);
  if (!context) {
    throw new Error('useParticipants must be used within a ParticipantsProvider');
  }
  return context;
};
