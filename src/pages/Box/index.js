import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import api from "../../services/api";
import "./styles.css";
import Dropzone from "react-dropzone";

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

  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;

      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
      console.log(file);
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
