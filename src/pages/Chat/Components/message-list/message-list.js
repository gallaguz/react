import {Input, withStyles, InputAdornment} from '@material-ui/core';
import {Send} from '@material-ui/icons';
import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {sendMessage} from '../../../../store/messages';
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


export const MessageListView = (props) => {
  // eslint-disable-next-line react/prop-types
  const {handleChangeValue, sendMessage, messages, value} = props;

  const ref = createRef();

  useEffect(() => {
    handleScrollBottom();
  });

  const handlePressInput = ({code}) => {
    if (code === 'Enter') {
      handleSendMessage(sendMessage, value);
    }
  };

  const handleSendMessage = (sendMessage, value) => {
    sendMessage({author: 'User', message: value});
  };

  // eslint-disable-next-line no-unused-vars
  const handleScrollBottom = () => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  };

  return (
    <>
      <div ref={ref}>
        {/* eslint-disable-next-line react/prop-types */}
        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}
      </div>

      <StyledInput
        fullWidth={true}
        value={value}
        /* eslint-disable-next-line react/prop-types */
        onChange={(e) => handleChangeValue(e.target.value)}
        onKeyPress={handlePressInput}
        placeholder="Введите сообщение..."
        endAdornment={
          <InputAdornment position="end">
            {value && (
              <Send
                className={styles.icon}
                onClick={handleSendMessage}
              />
            )}
          </InputAdornment>
        }
      />
    </>
  );
};

const mapStateToProps = (state, props) => {
  const {id} = props.match.params;

  return {
    messages: state.messagesReducer[id] || [],
    // @TODO проверить селектор value
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (params) => dispatch(sendMessage(params)),
  // @TODO добавить changeValue action
});

export const MessageList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageListView);
