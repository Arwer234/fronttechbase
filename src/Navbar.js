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
                        <a href="#navbar">click 1</a>
                    </li>
                    <li>
                        <a href="#navbar">click 2</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navbar