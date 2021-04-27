import React from "react";
import formatMoney from "../common/utils";
import { getTotal } from "../core/participants";

const TotalAccount = ({ participants }) => {
    const total = getTotal(participants);
    return <h2>Total: ${formatMoney(total)}</h2>;
};

export default TotalAccount;
