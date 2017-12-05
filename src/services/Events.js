import axios from 'axios';
import config from '../config';

class Events {
  getAll() {
    return axios.get(`${config.api}/events?_sort=date,time`);    
  }
  get(page) {
    return axios.get(`${config.api}/events?_sort=date,time&_order=desc,desc&_page=${page}`);
  }
  post(data) {
    return axios.post(`${config.api}/events`, data);
  }
  delete(id) {
    return axios.delete(`${config.api}/events/${id}`);
  }
  put(data) {
    return axios.put(`${config.api}/events/${data.id}`, data);    
  }
}

export default new Events();