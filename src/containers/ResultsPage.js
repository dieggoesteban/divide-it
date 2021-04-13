import React from "react";
import ParticipantsBalanceList from "../components/ParticipantsBalanceList";

const ResultsPage = ({ participants }) => {
  return (
    <>
      <section className="container">
        <h1>Resultados</h1>
        <div className="totales">
          <h1>Total: $5.529,75</h1>
          <h3>Total individual: $1.382,44</h3>
        </div>
        <hr />
        {participants.length > 0 ? (
          <ParticipantsBalanceList participants={participants} />
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
      </section>
      <input type="button" className="btn btn-align-right" value="Volver" />
    </>
  );
};

export default ResultsPage;
