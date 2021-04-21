import {List, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AddContactModal} from '../modal';
import {ChatItem} from './chatItem';

const ChatListView = ({match, conversations}) => {
  const chatId = match?.params.id || '';

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <List component="nav">
          {conversations.map((chat) => (
            <Link key={chat.title} to={`/chat/${chat.title}`}>
              <ChatItem title={chat.title} selected={chatId === chat.title} />
            </Link>
          ))}
        </List>
      </div>

      <AddContactModal isOpen={isOpen} onClose={toggleModal} />

      <Button variant="contained" fullWidth={true} onClick={toggleModal}>
        Добавить чат
      </Button>
    </>
  );
};

ChatListView.propTypes = {
  match: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  conversations: state.conversationReducer,
});

export const ChatList = connect(mapStateToProps)(ChatListView);

