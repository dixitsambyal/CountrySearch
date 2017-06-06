import { history, push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import {sortBy} from 'lodash'; 

import {
  REQUEST_COUNTRY_DATA,
  RECEIVE_COUNTRY_DATA } from './ActionTypes'

const mapCountryData = (countryData,inputText) => {
    var countryList = [];
for(var i=0;i<countryData.length;i++)
    {
       if(countryData[i].name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1)
           countryList.push({'country':countryData[i].name,'capital':countryData[i].capital,'continent':countryData[i].region,'population':countryData[i].population,'flag':countryData[i].flag}) 
    }
    return countryList;
}

const requestCountryData = (inputText) => {
  return {
    type: REQUEST_COUNTRY_DATA,
    inputText
  }
}

const receiveCountryData = (json,inputText) => {
  var countryData = []
  //json.length ? countryData = mapCountryData(json,inputText) : [] 
  json.length ? countryData = sortBy(json, (country) =>{ return country.name; }) : []
    
  return {
    type: RECEIVE_COUNTRY_DATA,
    countryData : mapCountryData(countryData,inputText)
  }
}

export const fetchCountryData = (inputText) => {
  return (dispatch) => {
    dispatch(requestCountryData(inputText))
		//const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
	const targetUrl = 'https://restcountries.eu/rest/v2/name/'+inputText
    return fetch(targetUrl)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveCountryData(json,inputText))
      })
  }
}

