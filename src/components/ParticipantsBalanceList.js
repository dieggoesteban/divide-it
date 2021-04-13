import React from "react";
import ParticipantBalanceSummary from "./ParticipantBalanceSummary";

const ParticipantsBalanceList = ({ participants }) => {
  return (
    <div className="participants-summary">
      {participants.length > 0 ? (
        participants.map((participant) => {
          return <ParticipantBalanceSummary participant={participant} />;
        })
      ) : (
        <h4>Aún no hay participantes.</h4>
      )}
    </div>
  );
};

export default ParticipantsBalanceList;
