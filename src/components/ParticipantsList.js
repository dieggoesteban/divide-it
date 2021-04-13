import React from "react";
import formatMoney from "../common/utils";

const ParticipantsList = ({ participants }) => {
  return (
    <section className="participants-list">
      <h2>Participantes: </h2>

      {participants.length > 0 ? (
        participants.map((participant) => {
          return (
            <div key={participant.id} className="participant">
              <h3>{participant.name}</h3>
              <h6>${formatMoney(participant.monto)}</h6>
            </div>
          );
        })
      ) : (
        <h4>Aún no hay participantes.</h4>
      )}
    </section>
  );
};

export default ParticipantsList;
