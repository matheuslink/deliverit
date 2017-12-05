import React from 'react';
import Proptypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './ErrorModal.less';

class ErrorModal extends React.Component { 
  constructor(props) {
    super(props);
    
    this.close = this.close.bind(this);
  }

  close() {
    this.props.close();
  }

  render() {
    const { show, title, text } = this.props;
    return (
      <Modal show={show} onHide={this.close} className="errorModal">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <p className="title">{title}</p>
          <p className="text">{text}</p>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={this.close}>Ok</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

ErrorModal.propTypes = {
  show: Proptypes.bool.isRequired,
  close: Proptypes.func.isRequired,
  title: Proptypes.string,
  text: Proptypes.string,
};

export default ErrorModal;