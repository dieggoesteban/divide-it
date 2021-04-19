import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
//import { Link } from "react-router-dom";
import ParticipantSummary from "../components/ParticipantSummary";
import { useHistory } from "react-router-dom";

const ParticipantDetailsPage = (props) => {
    const history = useHistory();
    const [id] = useState(props.match.params.id);
    const participant = useSelector((state) =>
        state.participants.find((participant) => participant.id === parseInt(id))
    );

    const _onGoBackHandler = () => {
        history.goBack();
    };

    return (
        <div>
            <ParticipantSummary participant={participant} />
            <Button variant="contained" color="secondary" onClick={_onGoBackHandler}>
                Volver
            </Button>
            {/* <Button component={Link} to={"/"} variant="contained" color="secondary">
                Volver
            </Button> */}
        </div>
    );
};

export default ParticipantDetailsPage;
