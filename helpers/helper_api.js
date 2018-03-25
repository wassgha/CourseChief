import axios from 'axios';
import moment from 'moment';

const apiKey = 'ce9cf4cc-c58f-394b-a0fa-d35e898e9a89';
// const baseUrl = 'https://mocksvc-proxy.anypoint.mulesoft.com/exchange/aa8378b5-ce36-4c80-94a1-2e6042908e1a.central-it/engage-exp-api/1.0.5';
const baseUrl = 'https://sandbox.api.it.nyu.edu/engage-exp';

export const request = (endpoint) => {
  return axios.get(baseUrl + endpoint, {
    headers: {'Authorization': 'Bearer ' + apiKey }
  });
}


export const listCourses = () => {
  console.log('List Courses');
  return request('/courses')
          .then(res => res.data)
          .catch(err => console.log(err));
}

export const listEvents = () => {
  console.log('List Events ');
  return request('/events?start_date=2018-03-25&end_date=2018-03-28')
          .then(res => res.data)
          .catch(err => console.log(err));
}
