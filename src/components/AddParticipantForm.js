import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

const AddParticipantForm = ({ onSubmit, participantNameRef }) => {
  const [name, setName] = useState("");
  const [monto, setMonto] = useState("");

  const _onSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name: name, monto: monto });
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
