import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import './FilmList.scss'

class CountryList extends Component {
  constructor(props) {
    super(props)
    // this.onClick = this.props.onClick
  }

  generateHeaders(row) {
    var headingData = Object.keys(row).map((key, i) => {
      return <td key={'heading-' + i} className="heading styles-text-white">{key[0].charAt(0).toUpperCase() + key.slice(1)}</td>
    })
    return <thead key={'thead'} className="header"><tr className="subheader">{headingData}</tr></thead>
  }

  generateRows(data) {
    return data.map((item, i) => {
      var countryData = Object.keys(item).map((key, j) => {
        if (j === 0) {
          return <td data-index={i} onClick={(e) => this.props.onClick(e.target.getAttribute('data-index'))} key={'film-details-' + j}>{item[key]}</td>
        } else if (j === 4){
          return <td data-index={i} onClick={(e) => this.props.onClick(e.target.getAttribute('data-index'))} key={'film-details-' + j}><img src={item[key]} /></td>
        } else {
          return <td data-index={i} onClick={(e) => this.props.onClick(e.target.getAttribute('data-index'))} key={'film-details-' + j}> {item[key]} </td>
        }
      });
      switch (i % 2) {
        case 0:
          return <tr key={'row-' + i}>{countryData}</tr>
          break
        case 1:
          return <tr key={'row-' + i}>{countryData}</tr>
          break
      }
    })
  }

  render() {
    const { countryData } = this.props.data

    let headerComponents = this.generateHeaders(this.props.data[0])
    let rowComponents = this.generateRows(this.props.data)

    return (
      <div>
        <div className="country-list-container">
          <div className="country-list-table">
            <table>
              {headerComponents}
              <tbody>
                {rowComponents}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

CountryList.propTypes = {
  data: PropTypes.array.isRequired
}

export default CountryList
