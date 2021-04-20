import PropTypes from 'prop-types';
import React from 'react';
import Styles from './Main.module.css';

export const Main = (props) => {
  return (
    <div className={Styles.wrapper}>
      <>{ props.header }</>
      <>{ props.children }</>
      <>{ props.footer }</>
    </div>
  );
};

Main.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
