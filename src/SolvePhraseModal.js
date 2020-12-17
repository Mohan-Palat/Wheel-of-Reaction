import React from "react";
import { Modal, Form, Button, Label, Header } from "semantic-ui-react";

const SolvePhraseModal = (props) => {
  console.log(props);
  return (
    <Modal open={props.open}>
      <Modal.Content>
        <Form onSubmit={props.solve}>
          <Label>Phrase:</Label>
          <Form.Input
            type="text"
            name="solve"
            onChange={props.solveAnswerChange}
          />
          <Modal.Actions>
            <Button  type="submit">
              Solve Phrase
            </Button>
          </Modal.Actions>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default SolvePhraseModal;