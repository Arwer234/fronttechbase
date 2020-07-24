import React, { PureComponent } from 'react'
import "./Main.css"
import Header from "./Header"
import Navbar from "./Navbar"
import TopicList from "./TopicList"
import ArticleList from "./ArticleList"
import Footer from "./Footer"
import { Scrollbars } from 'react-custom-scrollbars';


class Main extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      topicData: [],
      clickedArticle: false,
      chosenArticle: ""
    }
    this.fetchArticleData = this.fetchArticleData.bind(this)
  }
  componentDidMount = () => {
    //this.fetchArticleData({ target: { innerHTML: "JavaScript" } })
    this.updateWindowDimensions()
    console.log(document.getElementsByClassName("header")[0].parentElement)
    
    document.getElementsByClassName("header")[0].parentElement.style.overflow = "visible"
    document.getElementsByClassName("header")[0].parentElement.style.overflowY = "scroll"
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  changeArticle = (item) => {
    this.resetArticleList()
    console.log(item.target.innerHTML)
    if (!this.state.clickedArticle) {
      this.setState({
        clickedArticle: true,
        chosenArticle: item.target.innerHTML
      })
    }
  }
  resetArticleList = () => {
    console.log(this.state.chosenArticle, this.state.clickedArticle)
    this.setState({
      clickedArticle: false,
      chosenArticle: ""
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
        <Scrollbars 
          style={{ width: this.state.width, height: this.state.height}}
          
        >
          <Header />
          <Navbar fetchArticleData={this.fetchArticleData} />
          <div className="main">
            <TopicList changeArticle={this.changeArticle} data={this.state.topicData} />
            <div className="right">

              <ArticleList chosen={this.state.chosenArticle} clicked={this.state.clickedArticle} topicData={this.state.topicData} />
            </div>
          </div>
          <Footer />
        </Scrollbars >
      </div >
    )
  }
}

export default Main
