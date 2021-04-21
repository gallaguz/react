import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import {AccountCircle} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './chatItem.module.css';

const StyledListItem = withStyles(() => ({
  root: {
    '&.Mui-selected': {
      backgroundColor: '#2b5278',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#2b5278',
    },
  },
}))(ListItem);

// eslint-disable-next-line require-jsdoc
export const ChatItem = ({selected, title}) => {
  return (
    <StyledListItem button={true} selected={selected}>
      <ListItemIcon>
        <AccountCircle fontSize="large" className={styles.icon} />
      </ListItemIcon>
      <div className={styles.description}>
        <ListItemText className={styles.text} primary={title} />
        {/* <ListItemText className={styles.text} primary="12.30" /> */}
      </div>
    </StyledListItem>
  );
};

ChatItem.propTypes = {
  title: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};
