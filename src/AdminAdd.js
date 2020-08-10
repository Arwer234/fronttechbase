import React, { PureComponent } from 'react'
import "./AdminAdd.css"

class AdminAdd extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            name:"",
            category:"JavaScript",
            value:""
        }
    }

    inputChange = (ev)=>{
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    addArticle = ()=>{
        fetch('http://localhost:3001/addArticle',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({name:this.state.name ,category:this.state.category ,data:this.state.value }),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"http://localhost:3000"
                },
                credentials:"include",
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            if(response.status==="success"){
                this.setState({
                    name:"",
                    category:"JavaScript",
                    value:""
                })
            }
        })
    }

    render() {
        return (
            <div className="AdminAdd">
                <h2>Dodaj nowy artykuł</h2>

                <div>
                    <input placeholder="Name" name="name" onChange={this.inputChange} value={this.state.name}/>
                    Kategoria
                    <select name="category" onChange={this.inputChange}>
                        <option>
                            JavaScript
                        </option>
                        <option>
                            CSS
                        </option>
                        <option>
                            React
                        </option>
                        <option>
                            React Native
                        </option>
                    </select>

                    <textarea rows="20" cols="150" name="value" onChange={this.inputChange} value={this.state.value}>

                    </textarea>

                    <button onClick={this.addArticle}>Dodaj</button>
                </div>
            </div>
        )
    }
}

export default AdminAdd