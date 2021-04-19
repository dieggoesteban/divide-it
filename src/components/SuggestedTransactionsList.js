import React from "react";
import SuggestedTransaction from "../components/SuggestedTransaction";

const SuggestedTransactionsList = ({ transactions }) => {
    return (
        <div className="suggested-transactions">
            <h3>Transacciones sugeridas:</h3>
            {transactions.map((transaction, index) => {
                return <SuggestedTransaction key={index} transaction={transaction} />;
            })}
        </div>
    );
};

export default SuggestedTransactionsList;
