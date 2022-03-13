import React, { Fragment } from "react";
import { Modal, Button } from "react-bootstrap";

const BModal = ({
  children,
  backdrop,
  hideModal,
  hasFooter,
  showModal,
  title,
  ...rest
}) => {
  return (
    <Fragment>
      <Modal show={showModal} onHide={hideModal} {...rest} backdrop={backdrop}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {hasFooter && (
          <Modal.Footer>
            <Button variant="secondary" onClick={null}>
              Close
            </Button>
            <Button variant="primary" onClick={null}>
              Save Changes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </Fragment>
  );
};

BModal.defaultProps = {
  title: "Etranzact",
  hasFooter: false,
  backdrop: "static",
};

export default BModal;
