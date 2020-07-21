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
      topicData: []
    }
    this.fetchArticleData = this.fetchArticleData.bind(this)
  }
  componentDidMount = () => {
    this.fetchArticleData({ target: { innerHTML: "JavaScript" } })
  }

  async fetchArticleData(item) {
    const whichToFetch = item.target.innerHTML
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

            <ArticleList topicData={this.state.topicData} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Main
