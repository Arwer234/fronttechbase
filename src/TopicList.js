import React, { PureComponent } from 'react'
import BigButton from "./BigButton"
import "./TopicList.css"

class TopicList extends PureComponent {
    constructor(props) {
        super(props)
        

        this.state = {
            // topicData:[],
            buttons:[]
        }
   
    }

    componentDidMount = ()=>{
        console.log("did Mount")
        const obj = {
        name:"JavaScript"
        }
        console.log(obj)
        fetch('http://localhost:3001/getTopicData',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({name:"JavaScript"}),
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            console.log(response)
            
            var btnTemp = []
            for(let i = 0;i<response.length;i++){
                btnTemp.push(<BigButton key = {i} text = {response[i].text}/>)
            }
            this.setState({
                buttons:btnTemp
            })
        if (response.status === 'success'){
            alert("Message Sent."); 
        }else if(response.status === 'fail'){
            alert("Message failed to send.")
        }
        })
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