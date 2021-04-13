import React from "react";

const ParticipantSummary = ({ participant }) => {
  return (
    <>
      <div key={participant.id} className="participant">
        <h3>{participant.name}</h3>
        <h6>${formatMoney(participant.monto)}</h6>
      </div>
    </>
  );
};

export default ParticipantSummary;
