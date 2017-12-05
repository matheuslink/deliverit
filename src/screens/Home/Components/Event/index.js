import React  from 'react';
import PropTypes from 'prop-types';
import './Event.less';

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  delete(event) {
    this.props.delete(event);
  }

  update(event) {
    this.props.update(event);
  }
  
  render() {
    const { title, local, date, time } = this.props;
    const dateString = `${date} ${time}`
    const day = new Date(dateString).getDate();
    const monthArr = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL',
      'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const month = new Date(dateString).getMonth(); 
    return (
      <div className="event">
        <div className="category"></div>
        <div className="date">
          <span className="day">{day}</span>
          <span className="month">{monthArr[month]}</span>
        </div>
        <div className="divisor"></div>
        <div className="info">
          <p className="title">{title}</p>
          <div className="details">
            <p className="hour">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              <span>{time}</span>
            </p>
            <p className="location">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
              <span>{local}</span>
            </p>
          </div>
        </div>
        <div className="actions">
          <div className="btnAction edit" onClick={() => { this.update(this.props) }}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </div>
          <div className="btnAction delete" onClick={() => { this.delete(this.props) }}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  local: PropTypes.string.isRequired,
  delete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
};

export default Event;
