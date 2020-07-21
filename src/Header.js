import React, { PureComponent } from 'react'
import SearchBar from "./SearchBar"
import "./Header.css"
import LoginPopup from "./LoginPopup"
import BigButton from './BigButton'


class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showPopup:false
        }
    }

    popupClick= ()=>{

        //if !sessionAdmin==false

        this.setState({
            showPopup:!this.state.showPopup
        })
    }

    render() {
        return (
            <div className = "header">
                <h1>Front Base App</h1>
                <SearchBar/>
                <button onClick={this.popupClick}>Admin</button>
                {this.state.showPopup? <LoginPopup popupClick={this.popupClick}/>:null}
                
            </div>
        )
    }
}

export default Header