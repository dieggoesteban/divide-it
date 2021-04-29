import "../index.css";
import React from "react";
import AddParticipantForm from "../components/AddParticipantForm";
import ParticipantsList from "../components/ParticipantsList";
import TotalAccount from "../components/TotalAccount";
import { Box, Button, ButtonGroup, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearParticipants, resetIdCounter } from "../actions";

function App() {
    const participants = useSelector((state) => state.participants);
    const dispatch = useDispatch();

    const participantNameRef = React.useRef();
    /*const participantNameFocus = () => {
        participantNameRef.current.focus();
    };*/

    const resetApp = () => {
        dispatch(clearParticipants());
        dispatch(resetIdCounter());
        //participantNameFocus();
    };

    return (
        <>
            <AddParticipantForm participantNameRef={participantNameRef} />
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
                            <Button
                                component={Link}
                                to={"/results"}
                                variant="contained"
                                color="secondary"
                            >
                                Calcular
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default App;
