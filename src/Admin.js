import React, { PureComponent } from 'react'
import { Redirect } from 'react-router'
import Header from "./Header"

class Admin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            redirect:false,
        }
    }

    componentDidMount(){
        fetch(fetch('http://localhost:3001/authorize',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({username:this.state.username,password:this.state.password}),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"http://localhost:3000"
                },
                credentials:"include",
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            console.log(response)
            if(!response.authorized){
                this.setState({redirect:true})
            }
        })
    )
    }

    render() {
        return (
            <div>
            {this.state.redirect ? <Redirect to="/"/>:null}
                <Header/>
            </div>
        )
    }
}

export default Admin