import React from "react";
import WheelContainer from "./WheelContainer";
import {Modal} from "semantic-ui-react";

const SpinWheelModal = (props) => {
  console.log(props);


  return (
    <Modal basic size="large"  open={props.open} center >
      <Modal.Content >
        <WheelContainer handleAssignSpin={props.handleAssignSpin} />
      </Modal.Content>
    </Modal>
  );
};

export default SpinWheelModal;
