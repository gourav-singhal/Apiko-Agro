import React, { PropTypes } from 'react';
import { Modal, Button } from 'semantic-ui-react';

/**
 Provide button wit modal for form
 @example
 <Form.Field>
   <label>
    ...
    <ModalButton><CreateForm /></ModalButton>
   </label>
   <Dropdown... />
 </Form.Field>

**/

const ModalButton = ({ children, settings }) => (
  <Modal
    trigger={
      settings ?
        <Button {...settings} /> :
        <Button type="button" circular basic icon="plus" color="blue" floated="right" />
    }
  >
    <Modal.Content>
      <Modal.Description>
        {children}
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object,
};
export default ModalButton;
