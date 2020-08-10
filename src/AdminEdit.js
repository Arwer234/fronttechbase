import React, { PureComponent } from 'react'
import "./AdminEdit.css"

class AdminEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            articles:[],
            content:"",
            category:"",
            name:"",
            id:0
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
            
            this.setState({articles:response, content:response[0].content, category:response[0].belongs_to,name:response[0].name, id:response[0].id})
        })
    }

    selected = (ev)=>{
        let val = ev.target.value
        let element = this.state.articles.find((el)=> el.name==val)
        this.setState({content:element.content, category:element.belongs_to,name:element.name, id:element.id})
    }

    adminEdit = ()=>{
        console.log(this.state)
        fetch('http://localhost:3001/updateArticle',{
            method: "POST",
            mode:"cors",
            body: JSON.stringify({name:this.state.name ,category:this.state.category ,data:this.state.content, id:this.state.id }),
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"http://localhost:3000"
                },
                credentials:"include",
        }).then(
            (response) => (response.json())
        ).then((response)=>{
            if(response.status==="success"){
                let arr = this.state.articles.map((el)=>{
                    if(el.id===this.state.id){
                        let newEl = {
                            id:el.id,
                            name:this.state.name,
                            belongs_to:this.state.category,
                            content:this.state.content
                        }
                        return newEl
                    }else
                        return el
                })
                this.setState({articles: arr/*, content: arr[0].content, name: arr[0].name, category:arr[0].belongs_to, id:arr[0].id*/})
            }
            
        })
    }

    inputChange = (ev)=>{
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    render() {

        let options=[]
        this.state.articles.forEach((el)=>{
            options.push(<option key={el.id}>{el.name}</option>)
        })

        let categories = ["JavaScript","CSS","React","React Native"]
        categories = categories.map((el,i)=>{
            if(this.state.category===el)
            return <option key={i} selected={true}>{el}</option>
            return <option key={i}>{el}</option>
        })

        return (
            <div>
                <h2>Edytuj artykuł</h2>
                <select name="nazwa" onChange={this.selected}>
                    {options}
                </select>
                <input placeholder="Name" value={this.state.name} name="name" onChange={this.inputChange}/>
                    Kategoria
                    <select name="category" onChange={this.inputChange}>
                        {categories}
                    </select>

                    <textarea rows="20" cols="150" value={this.state.content} name="content" onChange={this.inputChange}/>

                    <button onClick={this.adminEdit}>Edytuj</button>
            </div>
        )
    }
}

export default AdminEdit