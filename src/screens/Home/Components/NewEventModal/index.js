import React from 'react';
import Proptypes from 'prop-types';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './NewEventModal.less';

class NewEventModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      local: '',
      date: '',
      time: '00:00',
      errMessage: '',
      disableEdit: false,
    }
    this.close = this.close.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.eventSelected) {
      
      const dateString = `${nextProps.eventSelected.date} ${nextProps.eventSelected.time}`;
      const date = new Date(dateString);
      const now = new Date();

      if (date < now) {
        this.setState({ disableEdit: true });
      } else {
        this.setState({ disableEdit: false });
      }

      this.setState({
        edited: true, 
        id: nextProps.eventSelected.id,       
        title: nextProps.eventSelected.title,
        local: nextProps.eventSelected.local,
        date: nextProps.eventSelected.date,
        time: nextProps.eventSelected.time,
      });

    } else {
      this.setState({
        edited: false,
        id: null,
        title: '',
        local: '',
        date: '',
        time: '00:00',
        disableEdit: false,
      });
    }
  }

  close() {
    this.setState({ errMessage: '' });
    this.props.close();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addNewEvent() {
    const data = {
      id: this.state.id,
      title: this.state.title,
      local: this.state.local,
      date: this.state.date,
      time: this.state.time,
    }

    if ((data.title) && (data.local) && (data.date) && (data.time)) {
      this.setState({ errMessage: '' });
      this.props.setEvent(data);      
    } else {
      this.setState({
        errMessage: "Preencha todos os campos."
      })
    }
  }

  render() {
    const { show } = this.props;

    return (
      <Modal show={show} onHide={this.close} className="newEventModal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>
            <span>{`${this.state.edited ? 'editar' : 'novo'} compromisso`}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Nome</ControlLabel>
            <FormControl 
              type="text"
              value={this.state.title}
              name="title"
              placeholder="Meu Evento"
              onChange={this.onChange}  
            />
          </FormGroup>
          <div className="flex">
            <FormGroup className="localInput">
              <ControlLabel>Local</ControlLabel>
              <FormControl 
                type="text" 
                value={this.state.local}
                name="local"
                placeholder="Rua 15 de Novembro, Centro"
                onChange={this.onChange}  
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Data</ControlLabel>
              <FormControl
                type="date" 
                value={this.state.date}
                name="date"
                onChange={this.onChange}
                disabled={this.state.disableEdit}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Hora</ControlLabel>
              <FormControl 
                componentClass="select" 
                value={this.state.time} 
                onChange={this.onChange}
                name="time"
                disabled={this.state.disableEdit}                
              >
                <option value="00:00">00:00</option>
                <option value="00:30">00:30</option>
                <option value="01:00">01:00</option>
                <option value="01:30">01:30</option>
                <option value="02:00">02:00</option>
                <option value="02:30">02:30</option>
                <option value="03:00">03:00</option>
                <option value="03:30">03:30</option>
                <option value="04:00">04:00</option>
                <option value="04:30">04:30</option>
                <option value="05:00">05:00</option>
                <option value="05:30">05:30</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
                <option value="22:00">22:00</option>
                <option value="22:30">22:30</option>
                <option value="23:00">23:00</option>
                <option value="23:30">23:30</option>
              </FormControl>
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p>{this.state.errMessage}</p>
          <Button bsStyle="success" onClick={this.addNewEvent}>Salvar</Button>
          <Button onClick={this.close}>Cancelar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewEventModal.propTypes = {
  show: Proptypes.bool.isRequired,
  close: Proptypes.func.isRequired,
  setEvent: Proptypes.func.isRequired,
  eventSelected: Proptypes.object,
};

export default NewEventModal;