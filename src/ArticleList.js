import React, { PureComponent } from 'react'
import Article from "./Article"
import "./ArticleList.css"

class ArticleList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            chosen:this.props.chosen
        }
    }

    render() {
        console.log("rerender article")
        var articleTab = []
        if(!this.props.clicked){
            articleTab = this.props.topicData.map((item)=>{
                return <Article mode = "hidden" key = {item.id} text = {item.content} topic = {item.name}/>
            })
        }
        else{
            articleTab = this.props.topicData.map((item)=>{
                if(item.name == this.props.chosen)  return <Article mode = "full" key = {item.id} text = {item.content} topic = {item.name}/>
            })
        }
        
        return (
            <div className="article-list">
                {articleTab}
            </div>
        )
    }
}

export default ArticleList