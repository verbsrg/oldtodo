import React from 'react';

import styles from './Header.module.css';

interface HeaderProps {
  todoCount: number;
}

export const Header: React.FC<HeaderProps> = ({ todoCount }) => (
  <div className={styles.header_container}>
    <div className={styles.header_title}>
      Your To Do list has <b>{todoCount}</b> task(s)
    </div>
  </div>
);
