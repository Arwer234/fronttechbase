import React, { PureComponent } from 'react'
import "./App.css"
import Header from "./Header"
import Navbar from "./Navbar"
import TopicList from "./TopicList"
import Article from "./Article"
import Footer from "./Footer"

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render() {
    return (
      <div className = "root">
        <Header/>
        <Navbar/>
        <div className = "main">
          <TopicList/>
          <div className="right">
            <Article/>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default App
