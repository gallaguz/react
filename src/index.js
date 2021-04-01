import React from "react"
import ReactDOM from "react-dom"

import "./index.css"

const messages = ["Hello..."]
let value = "lol"

const sendMessage = () => {
    messages.push(value)
    render()
}
const Messages = () => {
    return (
        <div>
            <h1>messages</h1>
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
            <input placeholder="Введите сообщение"/>
            <button onClick={ sendMessage }>Отправить</button>
        </div>
    )
}

const render = () => {
    ReactDOM.render(
        <>
            <Messages title="title"/>
        </>,
        document.querySelector("#root"),
    )
}

render()