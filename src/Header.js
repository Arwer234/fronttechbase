import React, { PureComponent } from 'react'
import SearchBar from "./SearchBar"
import "./Header.css"

class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className = "header">
                <img src = "" alt = ""/>
                <h1>Front Base App</h1>
                <SearchBar/>
            </div>
        )
    }
}

export default Header