import React from "react";
import ParticipantSummary from "./ParticipantSummary";

const ParticipantsList = ({ participants }) => {
    return (
        <section className="participants-list">
            <h2>Participantes: </h2>

            {participants.length > 0 ? (
                participants.map((participant) => {
                    return <ParticipantSummary key={participant.id} participant={participant} />;
                })
            ) : (
                <h4>Aún no hay participantes.</h4>
            )}
        </section>
    );
};

export default ParticipantsList;
