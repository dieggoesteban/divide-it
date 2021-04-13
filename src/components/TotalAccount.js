import React from "react";
import formatMoney from "../common/utils";

const TotalAccount = ({ participants }) => {
  const getTotal = () => {
    return participants.map((p) => parseFloat(p.monto)).reduce((acc, p) => acc + p);
  };

  return (
    <>
      {participants.length > 0 ? (
        <h2>Total: ${formatMoney(getTotal())}</h2>
      ) : (
        <h2>${formatMoney(0)}</h2>
      )}
    </>
  );
};

export default TotalAccount;
