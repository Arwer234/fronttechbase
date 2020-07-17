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
    console.log("did Mount")
    const obj = {
      name:"JavaScript"
    }
    console.log(obj)
    fetch('http://localhost:3001/getTopicData',{
        method: "POST",
        mode:"cors",
        body: JSON.stringify({name:"JavaScript"}),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(
    	(response) => (response.json())
       ).then((response)=>{
         console.log(response)
         this.setState({
           topicData:response
         })
      if (response.status === 'success'){
        alert("Message Sent."); 
      }else if(response.status === 'fail'){
        alert("Message failed to send.")
      }
    })
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
