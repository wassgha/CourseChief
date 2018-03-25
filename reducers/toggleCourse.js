import _ from 'lodash';
import * as API from '../helpers/helper_api';

const courses = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_COURSE':
      const newState = [ ... state ]
      console.log('state is ');
      console.log(state);
      if (newState.indexOf(action.course_id) >= 0) {
        console.log('removing course')
        newState.splice(newState.indexOf(action.course_id), 1);
      } else {
        console.log('adding course')
        /* Query server and get course details */
        // API.listCourses()
        //    .then( courses => {
        //      return _.find(courses, {course_id: action.course_id})
        //    } )
        //    .then( course => {
        //      console.log('========')
        //      console.log(course.course_id)
        //      state.push(course.course_id)
        //    })
        //    .catch(err => console.log(err));
        newState.push(action.course_id)
      }
      console.log('new state is');
      console.log(newState);
      return newState;
    default:
      return state
  }
}

export default courses
