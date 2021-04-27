import React from "react";

const TextInput = ({ label, variant, required, fullWidth, helperText, onChangeHandler }) => {
    return (
        <>
            <TextField
                label={label} //Monto
                variant={variant} //filled
                //onChange={(e) => setMonto(e.target.value)}
                onChange={onChangeHandler}
                type="text"
                value={monto}
                helperText={helperText} //"Decimales con punto (.)"
                fullWidth={fullWidth}
                required={required}
            />
        </>
    );
};

export default TextInput;
