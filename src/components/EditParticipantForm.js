import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideEditParticipantsModal, updateParticipant } from "../actions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const EditParticipantForm = () => {
    const initialParticipantState = {
        name: "",
        monto: 0,
    };
    const modal = useSelector((state) => state.editParticipantModal);
    const [currentParticipant, setCurrentParticipant] = useState(initialParticipantState);
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentParticipant(modal.targetParticipant);
    }, [modal]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentParticipant({ ...currentParticipant, [name]: value });
    };

    const handleClose = () => {
        dispatch(hideEditParticipantsModal());
    };

    const handleUpdateParticipant = (e) => {
        e.preventDefault();
        const data = {
            name: currentParticipant.name,
            monto: currentParticipant.monto,
        };
        dispatch(
            updateParticipant({
                id: modal.targetParticipant.id,
                ...data,
            })
        );

        handleClose();
    };

    return (
        <>
            <Dialog
                open={modal.showModal}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editar participante</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre"
                        type="text"
                        onChange={handleInputChange}
                        defaultValue={currentParticipant.name}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="monto"
                        name="monto"
                        label="Monto"
                        type="text"
                        onChange={handleInputChange}
                        defaultValue={currentParticipant.monto}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdateParticipant} color="primary" type="submit">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditParticipantForm;
