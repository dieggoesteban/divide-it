import React from "react";
import ParticipantsBalanceList from "../components/ParticipantsBalanceList";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getTotal, getTotalIndividual } from "../core/participants";
import formatMoney from "../common/utils";

const ResultsPage = () => {
    const participants = useSelector((state) => state.participants);
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
            <hr />
            <div className="suggested-transactions">
                <h3>Transacciones sugeridas:</h3>
                <div className="participant transaction">
                    <h4>Diego</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4 className="value neutral-value">$462,50</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4>Gonzalo</h4>
                </div>
                <div className="participant transaction">
                    <h4>Aldana</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4 className="value neutral-value">$1.382,44</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4>Gonzalo</h4>
                </div>
                <div className="participant transaction">
                    <h4>Mayra</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4 className="value neutral-value">$122,56</h4>
                    <i className="fas fa-arrow-right"></i>
                    <h4>Gonzalo</h4>
                </div>
            </div>
            <hr />
            <Button component={Link} to={"/"} variant="contained" color="secondary">
                Volver
            </Button>
        </>
    );
};

export default ResultsPage;
