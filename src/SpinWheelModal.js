import React from "react";
import WheelContainer from "./WheelContainer";
import { Modal, Header } from "semantic-ui-react";

const SpinWheelModal = (props) => {
  console.log(props);

  const bg = {
    overlay: {
      background: "#FFFF00"
    }
  };
  return (
    <Modal size="large" center  open={props.open}>
      <Modal.Content>
        <WheelContainer handleAssignSpin ={props.handleAssignSpin}/>
      </Modal.Content>
    </Modal>
  );
};

export default SpinWheelModal;
