import React, { PureComponent } from 'react'
import BigButton from "./BigButton"
import "./TopicList.css"

class TopicList extends PureComponent {
    constructor(props) {
        super(props)
        var btnTemp = []
        for(let i = 0;i<this.props.data.length;i++){
            btnTemp.push(<BigButton key = {i} text = {i}/>)
        }
        
        this.state = {
            buttons:btnTemp
        }
        
        
    }

    render() {
        return (
            <div id="topiclist">
                {this.state.buttons}
            </div>
        )
    }
}

export default TopicList