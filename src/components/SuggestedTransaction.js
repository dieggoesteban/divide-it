import React from "react";
import formatMoney from "../common/utils";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const SuggestedTransaction = ({ transaction }) => {
    return (
        <div className="participant transaction">
            <h4>{transaction.from.name}</h4>
            <ArrowForwardIcon />
            <h4 className="value neutral-value">${formatMoney(transaction.amount)}</h4>
            <ArrowForwardIcon />
            <h4>{transaction.to.name}</h4>
        </div>
    );
};

export default SuggestedTransaction;
