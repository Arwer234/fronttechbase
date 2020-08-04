import React, { PureComponent } from 'react'
import SearchBar from "./SearchBar"
import "./Header.css"
import LoginPopup from "./LoginPopup"
import BigButton from './BigButton'
import { Redirect } from 'react-router-dom'


class Header extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showPopup:false,
            redirect:false,
        }
    }

    popupClick= (res) => {

        //if !sessionAdmin==false

        this.setState({
            showPopup:!this.state.showPopup
        })
        if(res)
        if(res.redirect){
            this.setState({redirect:true})
        }

    }

    render() {
        return (
            <div className = "header">
                <div className="headerlogo">
                    <div className="logo"> </div>
                    <h1>Front Base App</h1>
                </div>
                
                <img src = "s" onClick={this.popupClick}/>
                {this.state.showPopup? <LoginPopup popupClick={this.popupClick}/>:null}
                {this.state.redirect ? <Redirect to="/admin"/>:null}
            </div>
        )
    }
}

export default Header