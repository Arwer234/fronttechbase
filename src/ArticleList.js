import React, { PureComponent } from 'react'
import Article from "./Article"
import "./ArticleList.css"

class ArticleList extends PureComponent {
    constructor(props) {
        super(props)

        // var articles = []
        // for (let i = 0; i < 4; i++) {
        //     articles.push(<Article key = {i}/>);
            
        // }

        // this.state = {
        //     articles:articles
        // }
    }

    render() {
        let articleTab = this.props.topicData.map((item)=>{
            return <Article key = {item.id} text = {item.content} />
        })
        return (
            <div className="article-list">
                {articleTab}
            </div>
        )
    }
}

export default ArticleList