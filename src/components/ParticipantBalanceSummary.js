import React from "react";

const ParticipantBalanceSummary = ({ participant }) => {
  return (
    <div className="participant participant-summary">
      <h3>{participant.name}:</h3>
      <h4 className="value negative-value">$0,00</h4>
    </div>
  );
};

export default ParticipantBalanceSummary;
