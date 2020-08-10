import React, { PureComponent } from 'react'
import { Redirect, Router, Route, Switch } from 'react-router'
import Header from "./Header"
import "./Admin.css"
import AdminAdd from "./AdminAdd"
import AdminDelete from "./AdminDelete"
import AdminEdit from "./AdminEdit"

class Admin extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            redirect:false,
        }
    }

    componentDidMount(){
            fetch('http://localhost:3001/authorize',{
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
                sessionStorage.removeItem("loggedIn")
                this.setState({redirect:true})
            }
        })
    }

    render() {
        return (
            <div>
            {this.state.redirect ? <Redirect to="/"/>:null}
                <Header/>
                <div className="actions">
                    <a href="/admin/add">Dodaj</a>
                    <a href="/admin/delete">Usuń</a>
                    <a href="/admin/edit">Edytuj</a>
                </div>
                <Switch>
                    <Route path="/admin/add">
                        <AdminAdd/>
                    </Route>
                    <Route path="/admin/delete">
                        <AdminDelete/>
                    </Route>
                    <Route path="/admin/edit">
                        <AdminEdit/>
                    </Route>
                    <Route path="/admin">
                        <h2>Wybierz czynność</h2>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default Admin