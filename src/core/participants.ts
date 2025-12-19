export interface Participant {
  id: string;
  name: string;
  amount: number;
  netAmount?: number;
}

export interface Transaction {
  from: Participant;
  to: Participant;
  amount: number;
}

export const getTotal = (participants: Participant[]): number => {
  if (participants.length > 0) {
    return participants
      .map((p) => (typeof p.amount === 'string' ? parseFloat(p.amount) : p.amount))
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

export const getParticipantsWithNetAmountCalc = (participants: Participant[]): Participant[] => {
  const totalIndividual = getTotalIndividual(participants);
  // Deep copy to avoid mutating the original array if needed, though map is cleaner
  const participantsEdited: Participant[] = JSON.parse(JSON.stringify(participants));
  
  participantsEdited.forEach((p) => {
    p.netAmount = getNetAmount(p, totalIndividual);
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

    let maxNetAmount = participantWithMaxNetAmount.netAmount || 0;
    let minNetAmount = participantWithMinNetAmount.netAmount || 0;

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
