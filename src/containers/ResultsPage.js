import React from "react";
import ParticipantsBalanceList from "../components/ParticipantsBalanceList";
import SuggestedTransactionsList from "../components/SuggestedTransactionsList";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import formatMoney from "../common/utils";
import {
    getTotal,
    getTotalIndividual,
    getParticipantsWithNetAmountCalc,
    getSuggestedTransactions,
} from "../core/participants";

const _getSuggestedTransactions = (participants) => {
    let suggestedTransactions = [];
    getSuggestedTransactions(suggestedTransactions, participants);
    return suggestedTransactions;
};

const ResultsPage = () => {
    const participants = useSelector((state) => state.participants);
    let calculatedParticipants = getParticipantsWithNetAmountCalc(participants);
    let suggestedTransactions = _getSuggestedTransactions(calculatedParticipants);
    const total = getTotal(participants);
    const totalIndividual = getTotalIndividual(participants);

    return (
        <>
            <h2>Resultados</h2>
            <div className="totales">
                <h2>Total: ${formatMoney(total)}</h2>
                <h3>Total individual: ${formatMoney(totalIndividual)}</h3>
            </div>
            <hr />
            {participants.length > 0 ? (
                <ParticipantsBalanceList
                    participants={participants}
                    total={total}
                    totalIndividual={totalIndividual}
                />
            ) : (
                <h4>Aún no hay participantes</h4>
            )}
            {total > 0 && participants.length > 1 ? (
                <>
                    <hr />
                    <SuggestedTransactionsList transactions={suggestedTransactions} />
                </>
            ) : (
                <></>
            )}
            <hr />
            <Button component={Link} to={"/"} variant="contained" color="secondary">
                Volver
            </Button>
        </>
    );
};

export default ResultsPage;
