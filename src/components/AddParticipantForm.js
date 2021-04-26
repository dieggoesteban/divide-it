import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addParticipant, incrementIdCounter } from "../actions";

const AddParticipantForm = ({ participantNameRef }) => {
    const participants = useSelector((state) => state.participants);
    const idCounter = useSelector((state) => state.idCounter);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [monto, setMonto] = useState("");

    const _onSubmit = (e) => {
        e.preventDefault();

        if (participants.find((participant) => participant.name === name)) {
            alert("Ya existe un participante con ese nombre");
            return;
        }

        let participant = { id: idCounter, name: name, monto: parseFloat(monto) };
        dispatch(addParticipant(participant));
        dispatch(incrementIdCounter());

        setName("");
        setMonto("");
    };

    return (
        <form onSubmit={_onSubmit} className="add-participant">
            <Box mb={2}>
                <TextField
                    label="Nombre"
                    variant="filled"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    inputRef={participantNameRef}
                    fullWidth
                    required
                    autoFocus
                />
            </Box>
            <Box mb={2}>
                <TextField
                    label="Monto"
                    variant="filled"
                    onChange={(e) => setMonto(e.target.value)}
                    type="text"
                    value={monto}
                    helperText="Decimales con punto (.)"
                    fullWidth
                    required
                />
            </Box>
            <Button
                className="btn-block"
                variant="contained"
                color="secondary"
                size="large"
                disableElevation
                type="submit"
            >
                Añadir participante
            </Button>
        </form>
    );
};

export default AddParticipantForm;
