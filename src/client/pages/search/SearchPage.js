import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import CountryList from '../../components/CountryList'
import { fetchCountryData } from './actions/Actions'

class SearchPage extends Component {

  constructor(props) {   
    super(props)   
    this.fetchData = this.fetchData.bind(this);    
    this.handleEnter = this.handleEnter.bind(this);      
    this.handleChange = this.handleChange.bind(this);      
    this.state = {
      input: '',   
    };  
  }         
  handleChange(e){
    this.setState({input: e.target.value});  
  }
  fetchData(){
    this.props.fetchCountryData(this.state.input); 
  }    
  handleEnter(event){ 
    if(event.keyCode === 13){
      this.fetchData()     
    } 
  }



  render() {
    const { countryData } = this.props
    const { handleChange, onClick } = this

    return (
      <div className="country-search">
        <label className="country-search-label">Search</label>
        <input className="styles-text-black" type="text" id="one" onKeyDown={event => this.handleEnter(event)} onChange={this.handleChange}/>
        <input type ="button" id="button"  value="Submit" onClick={this.fetchData} />
        {countryData != undefined && countryData.length >0 &&
                <CountryList data={countryData}/>
                } 
        
      </div>
    )
  }
}

SearchPage.propTypes = {
  countryData: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {

  const {countryDataState} = state

  const {
    isLoading,
    countryData
  } = countryDataState || {
    isLoading: true,
    countryData: []
  }

  return {
    isLoading,
    countryData
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    fetchCountryData: (inputText) => {
      dispatch(fetchCountryData(inputText))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
