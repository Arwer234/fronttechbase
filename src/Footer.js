import React, { PureComponent } from 'react'
import "./Footer.css"

class Footer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className = "footer">
                ⓒ Rafał Fatuła & Jakub Filipowski 2020
            </div>
        )
    }
}

export default Footer