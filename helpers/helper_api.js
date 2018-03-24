import axios from 'axios';
const apiKey = 'ce9cf4cc-c58f-394b-a0fa-d35e898e9a89';
const baseUrl = 'https://mocksvc.mulesoft.com/mocks/f51dbf22-8fb1-4760-b59d-8bd9b6fa7e60/courses';
// const baseUrl = 'https://sandbox.api.it.nyu.edu/course-catalog-exp';

export const request = (endpoint) => {
  return axios.get(baseUrl + endpoint, {
    headers: {'Authorization': 'Bearer ' + apiKey }
  });
}


export const listCourses = () => {
  console.log('List Courses');
  return request('/courses?course_title=Science')
          .then(res => res.data)
          .catch(err => console.log(err));
}
