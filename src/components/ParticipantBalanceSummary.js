import React from "react";
import formatMoney from "../common/utils";
import { getNetAmount } from "../core/participants";
//import { useHistory } from "react-router-dom";

const ParticipantBalanceSummary = ({ participant, total, totalIndividual }) => {
    const balance = getNetAmount(participant, totalIndividual);
    //const history = useHistory();
    // const _onClickHandler = () => {
    //     history.push("/participant/" + participant.id);
    // };

    return (
        <div className="participant-balance">
            <h3>{participant.name}:</h3>
            {balance > 0 ? (
                <h4 className="value positive-value">+ ${formatMoney(balance)}</h4>
            ) : balance == 0 ? (
                <h4 className="value neutral-value">${formatMoney(balance)}</h4>
            ) : (
                <h4 className="value negative-value">- ${formatMoney(balance)}</h4>
            )}
        </div>
    );
};

export default ParticipantBalanceSummary;
