import React, { PureComponent } from 'react'
import "./App.css"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./Main"
import Admin from "./Admin"

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <Router>
        <Route exact path="/" component={Main}/>
        <Route path="/admin" component={Admin}/>
      </Router>
    )
  }
}

export default App
