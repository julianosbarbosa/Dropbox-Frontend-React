import React, { Component } from "react";
import "./styles.css";

export default class Main extends Component {
  render() {
    return (
      <div id="main-container">
        <form action="">
          <h1>Dropbox</h1>
          <input type="text" placeholder="Criar um box" />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
