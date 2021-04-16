import React from "react";
import formatMoney from "../common/utils";
import { useHistory } from "react-router-dom";

const ParticipantSummary = ({ participant }) => {
    const history = useHistory();
    const _onClickHandler = () => {
        history.push("/participant/" + participant.id);
    };

    return (
        <>
            <div key={participant.id} className="participant" onClick={_onClickHandler}>
                <h3>{participant.name}</h3>
                <h6>${formatMoney(participant.monto)}</h6>
            </div>
        </>
    );
};

export default ParticipantSummary;
