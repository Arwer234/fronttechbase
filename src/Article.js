import React, { PureComponent } from 'react'
import "./Article.css"

class Article extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="article">
                {this.props.text}
            </div>
        )
    }
}

export default Article