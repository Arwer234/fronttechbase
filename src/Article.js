import React, { PureComponent } from 'react'
import "./Article.css"
import { text } from 'body-parser'
import Comments from "./Comments"

class Article extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let textContent = ""
        if(this.props.mode=="full") textContent = this.props.text
        else{
            for(let i = 0;i<35;i++){
                textContent += this.props.text[i]
            }
            textContent += "..."
        }

        return (
            <div className="article">
                <h3 className = "articleTitle" onClick = {this.props.changeArticle}>{this.props.topic}</h3>{textContent}
            </div>
        )
    }
}

export default Article