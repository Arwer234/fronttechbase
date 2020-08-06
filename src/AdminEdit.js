import React, { PureComponent } from 'react'
import "./AdminEdit.css"

class AdminEdit extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            articles:[],
            content:"",
            category:"",
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
            
            this.setState({articles:response, content:response[0].content, category:response[0].belongs_to,name:response[0].name})
        })
    }

    selected = (ev)=>{
        let val = ev.target.value
        let element = this.state.articles.find((el)=> el.name==val)
        this.setState({content:element.content, category:element.belongs_to,name:element.name})
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
                <input placeholder="Name" defaultValue={this.state.name}/>
                    Kategoria
                    <select>
                        {categories}
                    </select>

                    <textarea rows="20" cols="150" defaultValue={this.state.content}/>

                    <button>Edytuj</button>
            </div>
        )
    }
}

export default AdminEdit