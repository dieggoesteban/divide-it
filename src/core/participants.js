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

export const getBalance = (participant, totalIndividual) => {
    return (totalIndividual - participant.monto) * -1; //Al que le deben plata queda en positivo
};
