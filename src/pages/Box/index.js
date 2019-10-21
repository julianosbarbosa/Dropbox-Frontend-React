import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import api from "../../services/api";
import "./styles.css";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);
    this.setState({
      box: response.data
    });
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket("http://localhost:3333");

    io.emit("connectRoom", box);
    io.on("file", data => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] }
      });
    });
  };

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;

      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
    });
  };

  render() {
    const { box } = this.state;
    return (
      <div id="box-container">
        <header>
          <h1>Dropbox</h1>
          <h2>{box.title}</h2>
        </header>
        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>
        <ul>
          {box.files &&
            box.files.map(file => (
              <li key={file._id}>
                <a className="fileInfo" href={file.url}>
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
