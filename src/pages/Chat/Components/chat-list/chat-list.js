import {List} from '@material-ui/core';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Chat} from './chat';

export class ChatList extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const {conversations, match} = this.props;

    // eslint-disable-next-line react/prop-types
    const chatId = match?.params.id || '';

    return (
      <List component="nav">
        {/* eslint-disable-next-line react/prop-types */}
        {conversations.map((chat) => (
          <Link key={chat.title} to={`/chat/${chat.title}`}>
            <Chat title={chat.title} selected={chatId === chat.title} />
          </Link>
        ))}
      </List>
    );
  }
}

