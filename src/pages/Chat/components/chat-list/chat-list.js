import {List, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AddContactModal} from '../modal';
import {ChatItem} from './chatItem';
import Styles from './chatList.module.css';

const ChatListView = ({match, conversations, messages}) => {
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
            <Link key={chat.title} to={`/chat/${chat.title}`}>
              <ChatItem
                title={chat.title}
                selected={chatId === chat.title}
                lastMessage={lastMessage(chat)}
              />
            </Link>
          ))}
        </List>
      </div>

      <div>
        <AddContactModal isOpen={isOpen} onClose={toggleModal} />

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
};

const mapStateToProps = (state) => ({
  conversations: state.conversationsReducer,
  messages: state.messagesReducer,
});

export const ChatList = connect(mapStateToProps)(ChatListView);

