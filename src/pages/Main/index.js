import React, { Component } from "react";
import "./styles.css";
import api from "../../services/api";

export default class Main extends Component {
  state = {
    newBox: ""
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newBox } = this.state;
    const response = await api.post("boxes", {
      title: newBox
    });
    console.log(response.data);
  };

  handleChange = e => {
    this.setState({ newBox: e.target.value });
  };

  render() {
    const { newBox } = this.state;
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Dropbox</h1>
          <input
            type="text"
            placeholder="Criar um box"
            onChange={this.handleChange}
            value={newBox}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    );
  }
}
