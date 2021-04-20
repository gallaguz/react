import PropTypes from 'prop-types';
import {Component} from 'react';

export class MessageProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    match: PropTypes.any,
  };

  state = {
    conversations: [
      {
        title: 'room1',
        value: '',
        lastMessage: {author: 'User', message: 'Hi!', createdTs: new Date()},
      },
      {
        title: 'room2',
        value: '',
        lastMessage: {author: 'User', message: 'Hi!', createdTs: new Date()},
      },
    ],
    messages: {
      room1: [{author: 'User', message: 'Hi!', createdTs: new Date()}],
    },
  };

  handleChangeValue = (value) => {
    const {
      match: {params},
    } = this.props;

    this.setState({
      conversations: this.state.conversations.map((conversation) => {
        if (conversation.title === params.id) {
          return {...conversation, value};
        }
        return conversation;
      }),
    });
  };

  sendMessage = ({author, message}) => {
    if (!message) {
      return;
    }

    // const {
    //   match: {params},
    // } = this.props;

    const {params} = this.props.match;

    const newMessage = {author, message, createdTs: new Date()};

    this.setState({
      conversations: this.state.conversations.map((conversation) => {
        if (conversation.title === params.id) {
          return {...conversation, lastMessage: newMessage, value: ''};
        }
        return conversation;
      }),
      messages: {
        ...this.state.messages,
        [params.id]: [...(this.state.messages[params.id] || []), newMessage],
      },
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {params} = this.props.match;
    const {conversations, messages} = this.state;

    if (!params.id) {
      return;
    }

    const {lastMessage} = conversations.find(
        (conversation) => conversation.title === params.id
    );

    const currentMessage = messages[params.id];
    const prevMessage = prevState.messages[params.id];

    if (lastMessage?.author === 'User' && currentMessage !== prevMessage) {
      setTimeout(() => {
        this.sendMessage({author: 'bot', message: 'Haw are you?'});
      }, 500);
    }
  }

  render() {
    const {children, match} = this.props;
    const {messages, conversations} = this.state;

    const {id} = match.params ?? {};

    const state = {
      conversations,
      messages: messages[id] ?? [],
      value:
        conversations.find((conversation) => conversation.title === id)
            ?.value || '',
    };

    const actions = {
      handleChangeValue: this.handleChangeValue,
      sendMessage: this.sendMessage,
    };

    return children([state, actions]);
  }
}
