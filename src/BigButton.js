import React, { Component } from 'react';
import "./BigButton.css"

export default class BigButton extends Component {
  render() {
    return (
      <div className = "big-button" onClick={this.props.onClick}>
          {this.props.text}
      </div>
    );
  }
}
