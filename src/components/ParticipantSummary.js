import React from "react";
import formatMoney from "../common/utils";
// import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";
import { removeParticipant } from "../actions";
import { showEditParticipantsModal } from "../actions";

const ParticipantSummary = ({ participant }) => {
    // const history = useHistory();
    const dispatch = useDispatch();

    const _onEditHandler = () => {
        dispatch(showEditParticipantsModal(participant));
    };

    const _onDeleteHandler = (event) => {
        dispatch(removeParticipant(participant));
    };

    // const _onClickHandler = () => {
    //     history.push("/participant/" + participant.id);
    // };

    return (
        <>
            <div key={participant.id} className="participant-summary">
                <h3>{participant.name}</h3>
                <h5>${formatMoney(participant.monto)}</h5>
                <EditIcon style={{ cursor: "pointer" }} onClick={_onEditHandler} />
                <DeleteIcon style={{ cursor: "pointer" }} onClick={_onDeleteHandler} />
            </div>
        </>
    );
};

export default ParticipantSummary;
