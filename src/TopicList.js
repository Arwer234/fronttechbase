import React, { PureComponent } from 'react'
import BigButton from "./BigButton"
import "./TopicList.css"

class TopicList extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let btnTemp = []
        for(let i = 0;i<this.props.data.length;i++){
            btnTemp.push(<BigButton onClick = {this.props.changeArticle} key = {i} text = {this.props.data[i].name}/>)
        }
        return (
            <div id="topiclist">
                {btnTemp}
            </div>
        )
    }
}

export default TopicList