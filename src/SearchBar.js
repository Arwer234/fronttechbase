import React, { PureComponent } from 'react'
import "./SearchBar.css"

class SearchBar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            content: ""
        }
    }
    updateContent = (text) =>{
        this.setState({
            content:text
        })
    }
    handleKey = (e) =>{
        if(e.key==="Enter"){
            console.log("Send")
        }
    }

    render() {
        return (
            <input placeholder = "Szukaj ..." type = "text" value = {this.content} onChange = {this.updateContent} onKeyDown={(e) => this.handleKey(e)} id="searchbar"/> 
        )
    }
}

export default SearchBar