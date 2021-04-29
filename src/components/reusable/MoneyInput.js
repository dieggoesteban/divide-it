import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatCustom = ({ inputRef, onChange, name, ...other }) => {
    return (
        <>
            <NumberFormat
                {...other}
                getInputRef={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: name,
                            value: values.value,
                        },
                    });
                }}
                decimalSeparator=","
                thousandSeparator="."
                prefix="$"
                inputMode="decimal"
                isNumericString
            />
        </>
    );
};

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const MoneyInput = ({ ...other }) => {
    return (
        <>
            <TextField
                {...other}
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
            />
        </>
    );
};

export default MoneyInput;
