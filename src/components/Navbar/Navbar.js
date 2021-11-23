import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';

import styles from './Navbar.module.scss';
import Button from '../../shared/Button/Button';
import TextInput from '../../shared/TextInput/TextInput';

function Navbar({ navData, selectedSubreddit, onCloseNav, onShowAddSubreddit }) {
  const [inputSubreddit, setInputSubreddit] = useState('');
  const history = useHistory();

  const subreddit = selectedSubreddit ? '/r/' + selectedSubreddit : '';
  const renderNavData = navData.map((data, index) => {
    let selectedStyle;
    if (
      subreddit === data.path ||
      (subreddit === '' && data.path === '/home')
    ) {
      selectedStyle = styles.selectedSubreddit;
    }
    return (
      <li key={index}>
        <Link className={selectedStyle} to={data.path}>
          {data.text}
        </Link>
      </li>
    );
  });

  function onChangeSubreddit(id, value) {
    console.log(value);
    setInputSubreddit(value);
  }

  function onKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!inputSubreddit) {
        history.push('/home');
      } else {
        history.push('/r/' + inputSubreddit);
      }
    }
  }

  return (
    <div className={styles.sidebar}>
      <span>
        <IoIosClose alt="Close" onClick={onCloseNav} size="50px" />
      </span>
      <nav className={styles.nav}>
        <form className={styles.search}>
          <TextInput label="Go to Subreddit" onChange={onChangeSubreddit} onKeyPress={onKeyPress} value={inputSubreddit}/>
        </form>
        <ul>{renderNavData}</ul>
      </nav>
      <div className={styles.buttons}>
        <span className={styles.buttonLayout}>
          <Button onClickEvent={onShowAddSubreddit} label="Add Subreddit"/>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
