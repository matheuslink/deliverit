import React from 'react';
import PropTypes from 'prop-types';
import Event from '../Event';
import './Table.less';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsList: props.eventsList,
    };

    this.renderEvents = this.renderEvents.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ eventsList: nextProps.eventsList });
  }
  deleteEvent(event) {
    this.props.deleteEvent(event);
  }
  updateEvent(event) {
    this.props.updateEvent(event);
  }
  renderEvents(event, i) {
    return (
      <Event 
        key={i}
        id={event.id}
        title={event.title}
        local={event.local}
        date={event.date}
        time={event.time}
        delete={this.deleteEvent}
        update={this.updateEvent}
      />
    );
  }
  render() {
    return (
      <div className="eventTable">        
        {(this.state.eventsList.length > 0) ? (
          this.state.eventsList.map(this.renderEvents)
        ): (
          <div className="no-events">
            <p>Parabéns!</p>
            <p>Você concluíu todos os seus compromissos.</p> 
          </div>
        )}
      </div>
    );
  }
}

Table.propTypes = {
  eventsList: PropTypes.array.isRequired, 
  deleteEvent: PropTypes.func.isRequired,
  updateEvent: PropTypes.func.isRequired,
};

export default Table;

