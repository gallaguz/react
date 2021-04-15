import { Input, withStyles, InputAdornment } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React, { Component, createRef } from "react"

import { Message } from "./message"
import styles from "./message-list.module.css"

const StyledInput = withStyles(() => {
  return {
    root: {
      "&": {
        color: "#9a9fa1",
        padding: "10px 15px",
        fontSize: "15px",
      },
    },
  }
})(Input)

export class MessageList extends Component {
  state = {
    messages: [{ author: "FirstMessage", value: "Напишите первое сообщение" }],
    value: "",
  }

  ref = createRef()

  sendMessage = ({ author, value }) => {
    const { messages } = this.state

    if (value !== '') {
      if (messages[0].author === 'FirstMessage') {
        this.setState({
          messages: [{ author, value }],
          value: "",
        })
      } else {
        this.setState({
          messages: [...messages, { author, value }],
          value: "",
        })
      }
    }
  }

  handleChangeInput = ({ target }) => {
    this.setState({
      value: target.value,
    })
  }

  // fix scroll
  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
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
        this.sendMessage({ author: "bot", value: "Как дела?" })
      }, 500)
    }

    this.handleScrollBottom()
  }

  render() {
    const { messages, value } = this.state

    let messageList = <div>{messages[0].value}</div>

    if (messages[0].author !== 'FirstMessage') {
      messageList =
          <div ref={this.ref}>
            {messages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
          </div>
    }

    return (
      <>
        {messageList}
        <StyledInput
          fullWidth={true}
          value={value}
          onChange={this.handleChangeInput}
          onKeyPress={this.handlePressInput}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={() => {
                    this.sendMessage({ author: "User", value })
                  }}
                />
              )}
            </InputAdornment>
          }
        />
      </>
    )
  }
}
