//Functions

export const getTotal = (participants) => {
    if (participants.length > 0) {
        return participants.map((p) => parseFloat(p.monto)).reduce((acc, p) => acc + p);
    } else return 0;
};

export const getTotalIndividual = (participants) => {
    if (participants.length > 0) {
        return getTotal(participants) / participants.length;
    } else return 0;
};

export const getParticipantsWithNetAmountCalc = (participants) => {
    const totalIndividual = getTotalIndividual(participants);
    const participantsEdited = JSON.parse(JSON.stringify(participants));
    participantsEdited.forEach((p) => (p.netAmount = getNetAmount(p, totalIndividual)));
    return participantsEdited;
};

export const getNetAmount = (participant, totalIndividual) => {
    return participant.monto - totalIndividual;
};

function toWholeNumber(value) {
    return parseInt(value * 1000);
}

function toDecimalNumber(value) {
    return value / 1000;
}

export const getSuggestedTransactions = (suggestedTransactions = [], participants) => {
    if (participants.length === 0) {
        return;
    }

    let editableParticipants = JSON.parse(JSON.stringify(participants));

    //Get the participant with higher net amount
    let participantWithMaxNetAmount = editableParticipants.reduce((max, participant) =>
        max.netAmount > participant.netAmount ? max : participant
    );

    //Get the participant with lowest net amount
    let participantWithMinNetAmount = editableParticipants.reduce((min, participant) =>
        min.netAmount < participant.netAmount ? min : participant
    );

    let maxNetAmout = participantWithMaxNetAmount.netAmount;
    let minNetAmout = participantWithMinNetAmount.netAmount;
    maxNetAmout = toWholeNumber(maxNetAmout);
    minNetAmout = toWholeNumber(minNetAmout);

    if (Math.abs(maxNetAmout - minNetAmout) >= 500) {
        let result = maxNetAmout + minNetAmout;

        if (result >= 0) {
            suggestedTransactions.push({
                from: participantWithMinNetAmount,
                to: participantWithMaxNetAmount,
                amount: Math.abs(participantWithMinNetAmount.netAmount),
            });
            participantWithMaxNetAmount.netAmount = toDecimalNumber(result);
            participantWithMinNetAmount.netAmount = 0;
        } else {
            suggestedTransactions.push({
                from: participantWithMinNetAmount,
                to: participantWithMaxNetAmount,
                amount: Math.abs(participantWithMaxNetAmount.netAmount),
            });

            participantWithMaxNetAmount.netAmount = 0;
            participantWithMinNetAmount.netAmount = toDecimalNumber(result);
        }

        //return editableParticipants;
        return getSuggestedTransactions(suggestedTransactions, editableParticipants);
    }
};
