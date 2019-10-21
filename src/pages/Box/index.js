import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import api from "../../services/api";
import "./styles.css";

export default class Box extends Component {
  state = {
    box: ""
  };

  async componentDidMount() {
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({
      box: response.data
    });
  }

  render() {
    const { box } = this.state;
    return (
      <div id="box-container">
        <header>
          <h1>Dropbox</h1>
          <h2>{box.title}</h2>
        </header>
        <ul>
          {box.files &&
            box.files.map(file => (
              <li>
                <a className="fileInfo" href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#a5cfff" />
                  <strong>{file.title}</strong>
                </a>
                <span>há {file.createdAt}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
