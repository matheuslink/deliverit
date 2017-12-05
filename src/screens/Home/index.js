import React from 'react';
import Pagination from "react-js-pagination";
import Table from './Components/Table';
import NewEventModal from './Components/NewEventModal';
import ErrorModal from './Components/ErrorModal';
import EventsService from '../../services/Events';
import './Home.less';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allEventsList: [],
      eventsList: [],
      eventSelected: null,
      showModal: false,
      showErrorModal: false,
      titleErrorModal: '',
      textErrorModal: '',
      page: 1
    };
    
    this.toggleModal = this.toggleModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.setEvent = this.setEvent.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleUpdateEvent = this.handleUpdateEvent.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);
  }
  componentDidMount() {
    this.getAllEvents();
    this.getEvents(this.state.page);
  }
  getAllEvents() {
    EventsService.getAll()
    .then((res) => {
      this.setState({ allEventsList: res.data })
    })
    .catch((err) => {
      alert(err.data);
    })
  }
  getEvents(page) {
    EventsService.get(page)
    .then((res) => {
      this.setState({ eventsList: res.data })
    })
    .catch((err) => {
      alert(err.data);
    })
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  closeErrorModal() {
    this.setState({ 
      showErrorModal: false,
      titleErrorModal: '',
      textErrorModal: '',
    });
  }
  addEvent() {
    this.setState({ eventSelected: null });
    this.toggleModal();
  }
  setEvent(data) {
    if (data.id) {
      const eventsList = this.state.eventsList.slice();
      let unic = true;
      eventsList.map((item) => {
        if (item.date === data.date) {
          if (item.time === data.time) {
            if (item.id !== data.id) {
              unic = false;
            }
          } 
        }
      });

      if (unic) {
        EventsService.put(data)
        .then(() => {
          let eventsList = this.state.eventsList.slice();
          eventsList.map((item) => {
            if (data.id === item.id) {
              item.title = data.title;
              item.local = data.local;
              item.date = data.date;
              item.time = data.time;
            }
          });
          eventsList = eventsList.sort((a, b) => {
            const bDdateString = `${b.date} ${b.time}`;
            const aDdateString = `${a.date} ${a.time}`;            
            return new Date(bDdateString) - new Date (aDdateString);
          });
          this.setState({ eventsList });
          this.toggleModal();
        })
        .catch((err) => {
          alert(err)
        });
      } else {
        this.setState({
          showErrorModal: true,
          titleErrorModal: "Agenda lotada!",
          textErrorModal: "Você já tem um compromisso nesse horário.",
        });
      }
    } else {
      const dateString = `${data.date} ${data.time}`;
      const date = new Date(dateString);
      const now = new Date();

      if (date < now) {
        this.setState({
          showErrorModal: true,
          titleErrorModal: "Parece que essa data já passou!",
          textErrorModal: "Insira uma data válida para continuar.",
        });
      } else {
        const eventsList = this.state.eventsList.slice();
        let unic = true;
        eventsList.map((item) => {
          if (item.date === data.date) {
            if (item.time === data.time) {
              unic = false;
            } 
          }
        });
        
        if (unic) {
          EventsService.post(data)
            .then((res) => {
              let eventsList = this.state.eventsList.slice();
              eventsList.push(res.data);
              eventsList = eventsList.sort((a, b) => {
                const bDdateString = `${b.date} ${b.time}`;
                const aDdateString = `${a.date} ${a.time}`;            
                return new Date(bDdateString) - new Date (aDdateString);
              });
              this.setState({ eventsList });
              this.toggleModal();
            })
            .catch((err) => {
              alert(err)
            });
        } else {
          this.setState({
            showErrorModal: true,
            titleErrorModal: "Agenda lotada!",
            textErrorModal: "Você já tem um compromisso nesse horário.",
          });
        }
      }
    }
  }
  handleDeleteEvent(event) {
    const dateString = `${event.date} ${event.time}`;
    const date = new Date(dateString);
    const today = new Date();

    if (date.setHours(0,0,0,0) == today.setHours(0,0,0,0)) {
      this.setState({
        showErrorModal: true,
        titleErrorModal: "É HOJE!",
        textErrorModal: "Esse compromisso é hoje, por isso não pode excluí-lo ainda.",
      });
    } else {
      EventsService.delete(event.id)
      .then(() => {
        const eventsList = this.state.eventsList.slice();
        eventsList.map((item, i) => {
          if (event.id === item.id) {
            eventsList.splice(i, 1);
          }
        })
        this.setState({ eventsList });
      })  
      .catch((err) => {
        alert(err);
      }) 
    } 
  }
  handleUpdateEvent(event) {
    this.setState({ eventSelected: event })    
    this.toggleModal();
  }
  handlePageChange(pageNumber) {
    this.setState({ page: pageNumber });
    this.getEvents(pageNumber);
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <div className="wrap">
            <h1>Agenda de Compromissos</h1>
            <div className="btnNew" onClick={this.addEvent}>
              <span>Novo Compromisso</span>
            </div>
          </div>
        </div>
        <Table 
          eventsList={this.state.eventsList} 
          deleteEvent={this.handleDeleteEvent}
          updateEvent={this.handleUpdateEvent}
        />
        <div className="paginationBox">
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={10}
            totalItemsCount={this.state.allEventsList.length}
            pageRangeDisplayed={2}
            onChange={this.handlePageChange}
          />
        </div>
        <NewEventModal 
          show={this.state.showModal}
          close={this.toggleModal}
          setEvent={this.setEvent}
          eventSelected={this.state.eventSelected}
        />
        <ErrorModal 
          show={this.state.showErrorModal}
          close={this.closeErrorModal}
          title={this.state.titleErrorModal}
          text={this.state.textErrorModal}
        />
      </div>
    );
  }
}

export default Home;
