import React, { PureComponent } from 'react'
import BigButton from "./BigButton"
import "./LoginPopup.css"

class LoginPopup extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            username:"",
            password:""
        }
    }

    logIn = ()=>{

        //logowanie ...

        fetch('http://localhost:3001/login',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({username:this.state.username,password:this.state.password}),
            headers: {
            'Content-Type': 'application/json'
            },
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            console.log(response)
            
        if (response.status === 'success'){
            alert("Message Sent."); 
        }else if(response.status === 'fail'){
            alert("Message failed to send.")
        }
        })

        this.props.popupClick();
    }

    inputChange = (ev)=>{
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    render() {
        return (
            <div className="login-popup">
                <div className="login">
                    <div className="close" onClick={this.props.popupClick}>X</div>
                    <h2>Log in</h2>
                    <h5>to admin page</h5>
                    <div className="inputs">
                        <input placeholder="Login" value={this.state.username} onChange={this.inputChange} name="username"/>
                        <br/>
                        <input placeholder="Password" value={this.state.password} onChange={this.inputChange} name="password"/>
                    </div>
                    <BigButton text="Log in" onClick={this.logIn}/>
                </div>
            </div> 
        )
    }
}

export default LoginPopup