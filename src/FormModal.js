import React from "react";
import CarForm from "./CarForm";

const FormModal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <CarForm
          id={props.id}
          close={props.close}
          update={props.update}
          updateSo={props.updateSo}
        />
        <button type="button" onClick={props.close}>
          close modal
        </button>
      </div>
    </div>
  );
};
export default FormModal;
