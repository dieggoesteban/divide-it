export interface Item {
  id: string;
  description: string;
  amount: number;
  excludedParticipantIds?: string[]; // IDs of participants who do NOT share this expense
}

export interface Participant {
  id: string;
  name: string;
  items: Item[];
  amount: number;
  netAmount?: number;
}

export interface Transaction {
  from: Participant;
  to: Participant;
  amount: number;
}
