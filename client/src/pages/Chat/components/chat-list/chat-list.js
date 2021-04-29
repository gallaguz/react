import {List, Button} from '@material-ui/core';
import {push} from 'connected-react-router';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {AddContactModal} from '../addContactModal';
import {ChatItem} from './chatItem';
import Styles from './chatList.module.css';

const ChatListView = ({match, conversations, messages, push}) => {
  const chatId = match?.params.id || '';

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const lastMessage = (chat) => {
    const message = messages[chat.title] || [];
    return message[message.length - 1];
  };

  return (
    <div className={Styles.chatList}>
      <div>
        <List component="nav">
          {conversations.map((chat) => (
            <ChatItem
              key={chat.title}
              title={chat.title}
              selected={chatId === chat.title}
              lastMessage={lastMessage(chat)}
              handleNavigate={() => push(`/chat/${chat.title}`)}
            />
          ))}
        </List>
      </div>

      <div>
        <AddContactModal
          isOpen={isOpen}
          onClose={toggleModal}
          conversations={conversations}
        />

        <Button variant="contained" fullWidth={true} onClick={toggleModal}>
          Добавить чат
        </Button>
      </div>

    </div>
  );
};

ChatListView.propTypes = {
  match: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  messages: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer,
  messages: state.messagesReducer,
});

const mapDispatchToProps = (dispatch) => ({
  push: (link) => dispatch(push(link)),
});

export const ChatList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ChatListView);

