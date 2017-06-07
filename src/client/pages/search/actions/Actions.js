import { history, push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import {sortBy} from 'lodash'; 

import {  REQUEST_COUNTRY_DATA,  RECEIVE_COUNTRY_DATA } from './ActionTypes'

const mapCountryData = (countryData,inputText) => {
  var countryList = [];    
  if(countryData.length >0)
  {   
    for(var i=0;i<countryData.length;i++)    
    {       
      if(countryData[i].name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1) 
        countryList.push({'country':countryData[i].name,'capital':countryData[i].capital,'continent':countryData[i].region,'population':countryData[i].population,'flag':countryData[i].flag})
    }    }    
  if(!countryList.length >0){ 
    countryList.push({'NO RESULT FOUND':'Give another keyword'})    
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
  if(json.status==404)      {
    countryData = [];        
  }    else
  {        
    json.length ? countryData = sortBy(json, (country) =>{ return country.name; }) : []    
  }     
  return {   
    type: RECEIVE_COUNTRY_DATA,    
    countryData : mapCountryData(countryData,inputText)  
  }
}
export const fetchCountryData = (inputText) => {
  return (dispatch) => {
    dispatch(requestCountryData(inputText))      
    let targetUrl='';  
    if(inputText != '')
    { 
      targetUrl = 'https://restcountries.eu/rest/v2/name/'+inputText    
    }        
    else
    {          
      targetUrl = 'https://restcountries.eu/rest/v2/all'       
    }
    return fetch(targetUrl)    
      .then((response) => response.json())     
      .then((json) => {      
      dispatch(receiveCountryData(json,inputText))      
    })  
  }
}
