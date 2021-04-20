import {Input, withStyles, InputAdornment} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import React, {Component, createRef} from 'react';

import {Message} from './message';
import styles from './message-list.module.css';

const StyledInput = withStyles(() => {
  return {
    root: {
      '&': {
        color: '#9a9fa1',
        padding: '10px 15px',
        fontSize: '15px',
      },
    },
  };
})(Input);

export class MessageList extends Component {
  ref = createRef();


  handlePressInput = ({code}) => {
    if (code === 'Enter') {
      this.handleSendMessage();
      // this.handleSendMessage({author: 'User', value: this.state.value});
    }
  };

  handleSendMessage = () => {
    // eslint-disable-next-line react/prop-types
    const {sendMessage, value} = this.props;

    sendMessage({author: 'User', message: value});
  };

  handleScrollBottom = () => {
    if (this.ref.current) {
      this.ref.current.scrollTo(0, this.ref.current.scrollHeight);
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    // const {messages} = this.state;
    //
    // const lastMessage = messages[messages.length - 1];
    //
    // if (lastMessage.author === 'User' && prevState.messages !== messages) {
    //   setTimeout(() => {
    //     this.sendMessage({author: 'bot', value: 'Как дела ?'});
    //   }, 500);
    // }

    this.handleScrollBottom();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const {messages, value} = this.props;

    return (
      <>
        <div ref={this.ref}>
          {/* eslint-disable-next-line react/prop-types */}
          {messages.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </div>

        <StyledInput
          fullWidth={true}
          value={value}
          /* eslint-disable-next-line react/prop-types */
          onChange={(e) => this.props.handleChangeValue(e.target.value)}
          onKeyPress={this.handlePressInput}
          placeholder="Введите сообщение..."
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <Send
                  className={styles.icon}
                  onClick={this.handleSendMessage}
                />
              )}
            </InputAdornment>
          }
        />
      </>
    );
  }
}
