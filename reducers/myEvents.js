import _ from 'lodash';
import * as API from '../helpers/helper_api';

const myEvents = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_EVENT':
      console.log('old state')
      console.log(state)
      const newState = [ ... state ]
      if (_.find(newState, {id: action.event.id})) {
        console.log('removing event')
        _.remove(newState, {id: action.event.id})
      } else {
        console.log('adding event')
        newState.push(action.event)
      }
      console.log('new state is');
      console.log(newState);
      return newState;
    default:
      return state
  }
}

export default myEvents
