import React from 'react';
import {Logo} from '../logo';
import {Navigation} from '../navigation';
import Styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={Styles.Header}>
      <Logo />
      <Navigation />
    </header>
  );
};
