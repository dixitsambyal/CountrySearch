import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { routerReducer, UPDATE_LOCATION } from 'react-router-redux'

// Asynchronous/services state

import {
  REQUEST_COUNTRY_DATA,
  RECEIVE_COUNTRY_DATA } from '../pages/search/actions/ActionTypes'

// Asynchronous/services state

const countryDataState = (state = {
  isLoading: false,
  countryData: []
}, action) => {
  switch (action.type) {
    case REQUEST_COUNTRY_DATA:
      return Object.assign({}, state, {
        isLoading: true
      })
    case RECEIVE_COUNTRY_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        countryData: action.countryData || []
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  
  countryDataState,
  routing: routerReducer
})

export default rootReducer
