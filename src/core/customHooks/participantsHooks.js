import { useSelector } from "react-redux";

const useParticipantFormValidation = ({ name, monto }) => {
    const participants = useSelector((state) => state.participants);

    if (participants.find((participant) => participant.name === name)) {
        //alert("Ya existe un participante con ese nombre");
        return false;
    }
    return true;
};

export default useParticipantFormValidation;
