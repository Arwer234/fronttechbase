import React, { PureComponent } from 'react'
import "./Navbar.css"

class Navbar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div id="navbar">
                <ul>
                    <li>
                        <a href="#navbar">JavaScript</a>
                    </li>
                    <li>
                        <a href="#navbar">CSS</a>
                    </li>
                    <li>
                        <a href="#navbar">React</a>
                    </li>
                    <li>
                        <a href="#navbar">React Native</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar