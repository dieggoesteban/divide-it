import React from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatCustom = ({ inputRef, onChange, ...other }) => {
    return (
        <>
            <NumberFormat
                {...other}
                ref={inputRef}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            value: values.value,
                        },
                    });
                }}
                decimalSeparator=","
                thousandSeparator="."
                prefix="$"
                isNumericString
            />
        </>
    );
};

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const MoneyInput = ({ onChange, value, label, variant, helperText, fullWidth, required }) => {
    return (
        <>
            <TextField
                label={label}
                variant={variant}
                onChange={onChange}
                value={value}
                type="text"
                helperText={helperText}
                fullWidth={fullWidth}
                required={required}
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
            />
        </>
    );
};

export default MoneyInput;
