import React, { Component } from "react"

export default class Header extends Component {
  render() {
    return (
      <header className="layout">
        <a href="/" className="brand">
          <img src="http://placehold.jp/20/525252/ffffff/150x50.png?text=LOGO" alt="LOGO" />
        </a>
        MENU
      </header>
    )
  }
}
