import {Message} from "@components/message-list/message";
import React, { Component } from "react"

export class MessageList extends Component {
  state = {
    messages: [{ author: "User", value: "Тест сообщение" }],
    value: ''
  }

  sendMessage = ({ author, value}) => {
    const { messages } = this.state

    if (value !== '') {
      this.setState({
        messages: [...messages, { author, value }],
        value: ''
      })
    }
  }

  handleChangeInput = ({ target }) => {
    this.setState({
      value: target.value,
    })
  }

  handlePressInput = ({ code }) => {
    if (code === "Enter") {
      this.sendMessage({ author: "User", value: this.state.value })
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages } = this.state

    const lastMessage = messages[messages.length - 1]


    if (lastMessage.author === "User" && prevState.messages !== messages) {
      setTimeout(() => {
        this.sendMessage({ author: "bot", value: "Как дела ?" })
      }, 500)
    }
  }

  render() {
    const { messages, value } = this.state

    return (
        <div>
          {messages.map((message, index) => (
              <Message message={message} key={index} />
          ))}
          <input
              type="text"
              value={value}
              onChange={this.handleChangeInput}
              onKeyPress={this.handlePressInput}
              placeholder="Введите сообщение..."
          />
          <button
              onClick={() => {
                this.sendMessage({ author: "User", value })
              }}
          >
            Send
          </button>
        </div>
    )
  }
}
