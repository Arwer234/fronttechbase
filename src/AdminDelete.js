import React, { PureComponent } from 'react'
import "./AdminDelete.css"

class AdminDelete extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            articles:[],
            content:""
        }
    }

    componentDidMount(){
        fetch('http://localhost:3001/getArticles',{
            method: "POST",
            mode:"cors",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"http://localhost:3000"
                },
                credentials:"include",
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            
            this.setState({articles:response, content:response[0].content})
        })
    }

    selected = (ev)=>{
        let val = ev.target.value
        let cont= this.state.articles.find((el)=> el.name==val).content
        this.setState({content:cont})
    }

    render() {


        let options=[]
        this.state.articles.forEach((el)=>{
            options.push(<option key={el.id}>{el.name}</option>)
        })

        return (
            <div>
            <h2>Usuń artykuł</h2>
                <select name="nazwa" onChange={this.selected}>
                    {options}
                </select>
                <code className="content">
                    {this.state.content}
                </code>
                <button>Delete</button>
            </div>
        )
    }
}

export default AdminDelete