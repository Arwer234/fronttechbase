import React, { PureComponent } from 'react'
import "./AdminAdd.css"

class AdminAdd extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <div className="AdminAdd">
                <h2>Dodaj nowy artykuł</h2>

                <div>
                    <input placeholder="Name"/>
                    Kategoria
                    <select>
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
                            ReactNative
                        </option>
                    </select>

                    <textarea rows="20" cols="150">

                    </textarea>

                    <button>Dodaj</button>
                </div>
            </div>
        )
    }
}

export default AdminAdd