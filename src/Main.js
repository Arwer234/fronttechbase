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
      topicData: [],
      clickedArticle:false,
      chosenArticle:""
    }
    this.fetchArticleData = this.fetchArticleData.bind(this)
  }
  componentDidMount = () => {
    //this.fetchArticleData({ target: { innerHTML: "JavaScript" } })
  }
  changeArticle = (item) => {
    this.resetArticleList()
    console.log(item.target.innerHTML)
    if(!this.state.clickedArticle)
    {
      this.setState({
        clickedArticle:true,
        chosenArticle:item.target.innerHTML
      })
    }
  }
  resetArticleList = () =>{
    console.log(this.state.chosenArticle,this.state.clickedArticle)
    this.setState({
      clickedArticle:false,
      chosenArticle:""
    })
  }
  async fetchArticleData(item) {
    const whichToFetch = item.target.innerHTML
    this.resetArticleList()
    await fetch('http://localhost:3001/getTopicData', {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name: whichToFetch }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(
      (response) => (response.json())
    ).then((response) => {
      this.setState({
        topicData: response
      })
    })
  }

  render() {
    return (
      <div className="root">
        <Header />
        <Navbar fetchArticleData={this.fetchArticleData} />
        <div className="main">
          <TopicList changeArticle={this.changeArticle} data={this.state.topicData} />
          <div className="right">

            <ArticleList chosen = {this.state.chosenArticle} clicked = {this.state.clickedArticle} topicData={this.state.topicData} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Main
