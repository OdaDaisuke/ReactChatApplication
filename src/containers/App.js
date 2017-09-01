import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from "../components/Header"
import Footer from "../components/Footer"

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProcess) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
