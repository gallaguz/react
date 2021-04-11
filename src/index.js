import { MessageList } from "@components/message-list"
import React, { Component } from "react"
import ReactDOM from "react-dom"

import "./index.css"

class App extends Component {
    render() {
        return (
            <div>
                <h1>Сообщения</h1>
                <MessageList />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
