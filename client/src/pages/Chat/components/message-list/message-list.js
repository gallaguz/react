import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';
import React, {createRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {sendMessage, changeValue} from 'store';
import {StyledInput, Message, MessagesNotFound} from './components';
import Styles from './message-list.module.css';

export const MessageListView = (props) => {
  const {messages, value} = props;

  const inputRef = createRef();
  const scrollRef = createRef();

  const setInputFocus = (ref) => {
    return ref.current && ref.current.focus();
  };

  const handleEvent = ({type, code, target}) => {
    switch (type) {
      case 'change':
        return handleChangeInput(target?.value || '');
      case 'keypress':
        return handlePressInput(code);
      case 'click':
        return handleSendMessage();
      default:
        return console.warn(`No case for event type ${type}`);
    }
  };

  const handlePressInput = (code) => {
    if (code === 'Enter' || code === 'NumpadEnter') {
      handleSendMessage();
    }
  };

  const handleChangeInput = (value) => {
    const {changeValue, match} = props;
    const {id} = match.params;

    changeValue(id, value);
  };

  const handleSendMessage = () => {
    const {sendMessage, value, match} = props;
    const {id} = match.params;

    sendMessage({author: 'User', message: value, roomId: id});

    handleChangeInput();
  };

  const handleScrollBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  };

  // TODO удалить добавление id
  const withMessageId = () => {
    return messages.map((message) => {
      message = {...message, id: nanoid()};
      return message;
    });
  };

  useEffect(() => {
    setInputFocus(inputRef);
    handleScrollBottom();
  });

  return (
    <div className={Styles.messages}>
      <div ref={scrollRef}>
        {
          !withMessageId().length ?
            (<MessagesNotFound />) :
            (withMessageId().map((message) =>
              (<Message message={message} key={message.id} />)))
        }
      </div>

      <StyledInput
        inputRef={inputRef}
        handleEvent={handleEvent}
        value={value}
      />
    </div>
  );
};

MessageListView.propTypes = {
  changeValue: PropTypes.func,
  sendMessage: PropTypes.func,
  messages: PropTypes.array,
  value: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  const {id} = props.match.params;

  return {
    messages: state.messagesReducer[id] || [],
    value:
      state.conversationsReducer.find(
          (conversation) => conversation.title === id,
      )?.value || '',
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (params) => dispatch(sendMessage(params)),
  changeValue: (id, value) => dispatch(changeValue(id, value)),
});

export const MessageList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageListView);
