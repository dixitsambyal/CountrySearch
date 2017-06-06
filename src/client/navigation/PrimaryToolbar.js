import React, { Component } from 'react'
import { connect } from 'react-redux'

class PrimaryToolbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="primary-toolbar">
        <div className="primary-toolbar-title">COUNTRY SEARCH</div>
      </div>
    )
  }
}

export default PrimaryToolbar
