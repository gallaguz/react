import classNames from 'classnames';
import {format} from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './message.module.css';

export const Message = (props) => {
  const {
    message: {message, author, createdTs},
  } = props;

  return (
    <div
      className={classNames(styles.message, {
        [styles.currentMessage]: author === 'User',
      })}
    >
      <h3>{message}</h3>
      <p>{author}</p>
      <p>{format(createdTs, 'HH:mm:ss')}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdTs: PropTypes.any,
  }),
};


// export class Message extends Component {
//   static propTypes = {
//     message: PropTypes.shape({
//       author: PropTypes.string.isRequired,
//       value: PropTypes.string.isRequired,
//     }),
//   };
//
//   // eslint-disable-next-line require-jsdoc
//   render() {
//     const {
//       message: {value, author},
//     } = this.props;
//
//     return (
//       <div
//         className={classNames(styles.message, {
//           [styles.currentMessage]: author === 'User',
//         })}
//       >
//         <h3>{value}</h3>
//         <p>{author}</p>
//         {/* @TODO use date-fns */}
//         <p>12.03</p>
//       </div>
//     );
//   }
// }
