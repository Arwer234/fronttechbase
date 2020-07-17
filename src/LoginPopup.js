import React, { PureComponent } from 'react'
import BigButton from "./BigButton"
import "./LoginPopup.css"

class LoginPopup extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="login-popup">
                <div className="login">
                    <h2>Log in</h2>
                    <h5>to admin page</h5>
                    <div className="inputs">
                        <input placeholder="Login"/>
                        <br/>
                        <input placeholder="Password"/>
                    </div>
                    <BigButton text="Log in"/>
                </div>
            </div>
        )
    }
}

export default LoginPopup