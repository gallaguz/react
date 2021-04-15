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
    messages: [{ author: "User", value: "Тест сообщение" }],
    value: "",
  }

  ref = createRef()

  sendMessage = ({ author, value }) => {
    const { messages } = this.state

    this.setState({
      messages: [...messages, { author, value }],
      value: "",
    })
  }

  // handleChangeInput = ({ target }) => {
  //   this.setState({
  //     value: target.value,
  //   })
  // }

  handlePressInput = ({ code }) => {
    if (code === "Enter") {
      this.sendMessage({ author: "User", value: this.state.value })
    }
  }

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight)
    }
  }

  componentDidUpdate(_, state) {
    const { messages } = this.state

    const lastMessage = messages[messages.length - 1]

    if (lastMessage.author === "User" && state.messages !== messages) {
      setTimeout(() => {
        this.sendMessage({ author: "bot", value: "Как дела ?" })
      }, 500)
    }

    this.handleScrollBottom()
  }

  render() {
    const { messages } = this.state
    const { value } = this.props

    return (
      <>
        <div ref={this.ref}>
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>

        <StyledInput
          fullWidth={true}
          value={value}
          // onChange={e => this.props.handleChangeValue(e.target.value)}
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
