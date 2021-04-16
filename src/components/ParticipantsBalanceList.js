import React from "react";
import ParticipantBalanceSummary from "./ParticipantBalanceSummary";

const ParticipantsBalanceList = ({ participants, total, totalIndividual }) => {
    return (
        <div className="participants-summary">
            {participants.length > 0 ? (
                participants.map((participant) => {
                    return (
                        <ParticipantBalanceSummary
                            participant={participant}
                            total={total}
                            totalIndividual={totalIndividual}
                        />
                    );
                })
            ) : (
                <h4>Aún no hay participantes.</h4>
            )}
        </div>
    );
};

export default ParticipantsBalanceList;
