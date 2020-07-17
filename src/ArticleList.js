import React, { PureComponent } from 'react'
import Article from "./Article"
import "./ArticleList.css"

class ArticleList extends PureComponent {
    constructor(props) {
        super(props)

        var articles = []
        for (let i = 0; i < 4; i++) {
            articles.push(<Article key = {i}/>);
            
        }

        this.state = {
            articles:articles
        }
    }

    render() {
        return (
            <div className="article-list">
                {this.state.articles}
            </div>
        )
    }
}

export default ArticleList