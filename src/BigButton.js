import React, { Component } from 'react';
import "./BigButton.css"

export default class BigButton extends Component {
  render() {
    return (
      <div className = "big-button">
          {this.props.text}
      </div>
    );
  }
}
