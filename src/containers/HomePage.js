import "../index.css";
import React, { useState } from "react";
import AddParticipantForm from "../components/AddParticipantForm";
import ParticipantsList from "../components/ParticipantsList";
import TotalAccount from "../components/TotalAccount";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

function App() {
  const [idCounter, setIdCounter] = useState(1);
  const [participants, setParticipants] = useState([]);

  const participantNameRef = React.useRef();
  const participantNameFocus = () => {
    participantNameRef.current.focus();
  };

  const handleSubmit = (participant) => {
    const newParticipant = { id: idCounter, ...participant };

    setParticipants([...participants, newParticipant]);
    setIdCounter(idCounter + 1);
  };

  const resetApp = () => {
    setParticipants([]);
    setIdCounter(1);
    participantNameFocus();
  };

  return (
    <div className="container">
      <AddParticipantForm onSubmit={handleSubmit} participantNameRef={participantNameRef} />
      <hr />
      <ParticipantsList participants={participants} />
      <hr />
      <TotalAccount participants={participants} />
      <Box mt={1}>
        <Grid container justify="flex-end">
          <Grid item>
            <ButtonGroup>
              <Button variant="contained" onClick={resetApp}>
                Reiniciar
              </Button>
              <Button component={Link} to={"/results"} variant="contained" color="secondary">
                Calcular
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
