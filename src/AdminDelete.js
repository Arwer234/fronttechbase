import React, { PureComponent } from 'react'
import "./AdminDelete.css"

class AdminDelete extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            articles:[],
            content:"",
            name:""
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
            
            this.setState({articles:response, content:response[0].content, name:response[0].name})
        })
    }

    selected = (ev)=>{
        let val = ev.target.value
        let cont= this.state.articles.find((el)=> el.name==val).content
        this.setState({content:cont, name:val})
    }

    deleteArticle = ()=>{
        fetch('http://localhost:3001/deleteArticle',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({name:this.state.name}),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"http://localhost:3000"
                },
                credentials:"include",
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            if(response.status==="success"){
                let arr = this.state.articles.filter((el)=>el.name!=this.state.name)
                this.setState({articles: arr, content: arr[0].content, name: arr[0].name})
            }
            
        })
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
                <button onClick={this.deleteArticle}>Delete</button>
            </div>
        )
    }
}

export default AdminDelete