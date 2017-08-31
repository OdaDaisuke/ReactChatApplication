import React, { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <header className="layout">
        <a href="/" className="brand">
          <img src="logo.jpg" alt="LOGO" />
        </a>
        MENU
      </header>
    )
  }
}
