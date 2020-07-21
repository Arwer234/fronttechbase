import React, { PureComponent } from 'react'
import "./Main.css"
import Header from "./Header"
import Navbar from "./Navbar"
import TopicList from "./TopicList"
import ArticleList from "./ArticleList"
import Footer from "./Footer"


class Main extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      topicData:{}
    }
  }
  componentDidMount = ()=>{
    
  }
  render() {
    return (
        <div className = "root">
            <Header/>
            <Navbar/>
            <div className = "main">
            <TopicList data = {this.state.topicData}/>
            <div className="right">

                <ArticleList/>
            </div>
            </div>
            <Footer/>
        </div>
    )
  }
}

export default Main
