import React, { Component } from "react"

export default class Footer extends Component {
  render() {
    return (
      <footer className="layout">
        <div className="container">
          <a href="/" className="brand">
            <img src="logo.jpg" alt="LOGO" />
          </a>
          FOOTER MENU
        </div>
      </footer>
    )
  }
}
