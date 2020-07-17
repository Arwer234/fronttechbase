import React, { PureComponent } from 'react'
import SearchBar from "./SearchBar"
import "./Header.css"
import LoginPopup from "./LoginPopup"


class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className = "header">
                <h1>Front Base App</h1>
                <SearchBar/>
                <a href="/admin"> admin</a>
                <LoginPopup/>
            </div>
        )
    }
}

export default Header