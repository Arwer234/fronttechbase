import React, { PureComponent } from 'react'
import "./Navbar.css"

class Navbar extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="navbar">
                <ul>
                    <li>
                        <a onClick = {this.props.fetchArticleData} href="#navbar">JavaScript</a>
                    </li>
                    <li>
                        <a onClick = {this.props.fetchArticleData} href="#navbar">CSS</a>
                    </li>
                    <li>
                        <a onClick = {this.props.fetchArticleData} href="#navbar">React</a>
                    </li>
                    <li>
                        <a onClick = {this.props.fetchArticleData} href="#navbar">React Native</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar