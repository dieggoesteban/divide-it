export interface Item {
  id: string;
  description: string;
  amount: number;
  excludedParticipantIds?: string[]; // IDs of participants who do NOT share this expense
}

/**
 * Helper to check if a participant is included in an item.
 * Note: The data model uses 'excludedParticipantIds' (negative logic),
 * so a participant is included if they are NOT in that list.
 */
export const isParticipantIncluded = (item: Item, participantId: string): boolean => {
  return !item.excludedParticipantIds?.includes(participantId);
};

export interface Participant {
  id: string;
  name: string;
  items: Item[];
  amount: number;
  netAmount?: number;
  fairShare?: number; // What this participant should have paid (their debt/quota)
}

export interface Transaction {
  from: Participant;
  to: Participant;
  amount: number;
}

export const getTotal = (participants: Participant[]): number => {
  if (participants.length > 0) {
    return participants
      .map((p) => {
        // Convert string amounts to numbers
        const amount = typeof p.amount === 'string' ? parseFloat(p.amount) : p.amount;
        return amount;
      })
      .reduce((acc, p) => acc + p, 0);
  } else {
    return 0;
  }
};

export const getTotalIndividual = (participants: Participant[]): number => {
  if (participants.length > 0) {
    return getTotal(participants) / participants.length;
  } else {
    return 0;
  }
};

export const getNetAmount = (participant: Participant, totalIndividual: number): number => {
  const amount = typeof participant.amount === 'string' ? parseFloat(participant.amount) : participant.amount;
  return amount - totalIndividual;
};

/**
 * Calculates fairShare (what each participant should pay) and netAmount (balance)
 * considering item exclusions.
 * 
 * New Logic:
 * - For each item, split its cost among non-excluded participants
 * - Accumulate "fairShare" (what one should have paid) for each participant
 * - netAmount = paidAmount - fairShare
 */
export const getParticipantsWithNetAmountCalc = (participants: Participant[]): Participant[] => {
  if (participants.length === 0) {
    return [];
  }

  // Deep copy to avoid mutating the original array
  const participantsEdited: Participant[] = structuredClone(participants);
  
  // Initialize fairShare for all participants
  participantsEdited.forEach((p) => {
    p.fairShare = 0;
  });

  // Create a map for O(1) participant lookup
  const participantMap = new Map<string, Participant>();
  participantsEdited.forEach(p => participantMap.set(p.id, p));

  // Get all participant IDs for reference
  const allParticipantIds = participantsEdited.map(p => p.id);

  // Collect all items from all participants
  const allItems: { item: Item; ownerId: string }[] = [];
  participantsEdited.forEach((p) => {
    p.items.forEach((item) => {
      allItems.push({ item, ownerId: p.id });
    });
  });

  // Calculate fairShare for each item
  allItems.forEach(({ item }) => {
    const excludedIds = item.excludedParticipantIds || [];
    
    // Get participants who share this item (not excluded)
    const includedParticipantIds = allParticipantIds.filter(id => !excludedIds.includes(id));
    
    if (includedParticipantIds.length === 0) {
      console.warn(`Item "${item.description}" (ID: ${item.id}) has no included participants. It will not contribute to fairShare calculations.`);
      return;
    }

    // Calculate cost per included participant
    const costPerParticipant = item.amount / includedParticipantIds.length;

    // Add to each included participant's fairShare
    includedParticipantIds.forEach((participantId) => {
      const participant = participantMap.get(participantId);
      if (participant) {
        participant.fairShare = (participant.fairShare || 0) + costPerParticipant;
      }
    });
  });

  // Calculate netAmount for each participant: paid - fairShare
  participantsEdited.forEach((p) => {
    const amount = typeof p.amount === 'string' ? parseFloat(p.amount) : p.amount;
    p.netAmount = amount - (p.fairShare || 0);
  });
  
  return participantsEdited;
};

function toWholeNumber(value: number): number {
  return Math.round(value * 1000);
}

function toDecimalNumber(value: number): number {
  return value / 1000;
}

export const getSuggestedTransactions = (
  participants: Participant[],
  suggestedTransactions: Transaction[] = []
): Transaction[] | undefined => {
  if (participants.length === 0) {
    return undefined;
  }

  // We work with a copy to modify netAmounts during calculation
  const editableParticipants: Participant[] = JSON.parse(JSON.stringify(participants));

  // Recursive function to fill suggestedTransactions
  const calculate = (currentParticipants: Participant[]) => {
    // Get the participant with higher net amount
    const participantWithMaxNetAmount = currentParticipants.reduce((max, participant) =>
      (max.netAmount || 0) > (participant.netAmount || 0) ? max : participant
    );

    // Get the participant with lowest net amount
    const participantWithMinNetAmount = currentParticipants.reduce((min, participant) =>
      (min.netAmount || 0) < (participant.netAmount || 0) ? min : participant
    );

    const maxNetAmount = participantWithMaxNetAmount.netAmount || 0;
    const minNetAmount = participantWithMinNetAmount.netAmount || 0;

    // Convert to whole numbers to avoid floating point issues
    const maxNetAmountWhole = toWholeNumber(maxNetAmount);
    const minNetAmountWhole = toWholeNumber(minNetAmount);

    // If the difference is significant (using 500 as epsilon from original code, likely 0.5)
    // Original code: if (Math.abs(maxNetAmout - minNetAmout) >= 500)
    // Note: Original used parseInt(value * 1000), so 500 is 0.5 units.
    if (Math.abs(maxNetAmountWhole - minNetAmountWhole) >= 500) { // This logic seems slightly flawed in original if it's checking balance, but let's preserve it or fix it.
      // Actually, we want to settle debts.
      // If max is positive and min is negative.
      
      const result = maxNetAmountWhole + minNetAmountWhole;

      if (result >= 0) {
        // Max has more positive than Min has negative. Min pays full debt to Max.
        suggestedTransactions.push({
          from: participantWithMinNetAmount,
          to: participantWithMaxNetAmount,
          amount: Math.abs(minNetAmount),
        });
        participantWithMaxNetAmount.netAmount = toDecimalNumber(result);
        participantWithMinNetAmount.netAmount = 0;
      } else {
        // Min has more negative than Max has positive. Min pays Max's full credit.
        suggestedTransactions.push({
          from: participantWithMinNetAmount,
          to: participantWithMaxNetAmount,
          amount: Math.abs(maxNetAmount),
        });

        participantWithMaxNetAmount.netAmount = 0;
        participantWithMinNetAmount.netAmount = toDecimalNumber(result);
      }

      calculate(currentParticipants);
    }
  };

  calculate(editableParticipants);
  return suggestedTransactions;
};
