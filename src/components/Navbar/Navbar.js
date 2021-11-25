import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

function Navbar({ navData, onClickNav, onShowAddSubreddit, match }) {
  console.log(match);
  const [inputSubreddit, setInputSubreddit] = useState("");
  const history = useHistory();
  const isMobile = window.screen.width >= 320 && window.screen.width <= 480;

  // const subreddit = selectedSubreddit ? "/r/" + selectedSubreddit : "";
  const renderNavData = navData.map((data, index) => {
    let selectedStyle;
    // if (
    //   subreddit === data.path ||
    //   (subreddit === "" && data.path === "/home")
    // ) {
    //   selectedStyle = styles.selectedSubreddit;
    // }
    return (
      <li key={index}>
        <Link className={selectedStyle} to={data.path} onClick={onClickNavItem}>
          {data.text}
        </Link>
      </li>
    );
  });

  function onClickNavItem() {
    if (isMobile) {
      onClickNav();
    }
  }

  function onChangeSubreddit(id, value) {
    setInputSubreddit(value);
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!inputSubreddit) {
        history.push("/home");
      } else {
        history.push("/r/" + inputSubreddit);
      }

      if (isMobile) {
        onClickNav();
      }
    }
  }

  return (
    <div className={styles.sidebar}>
      <span>
        <IoIosClose alt="Close" onClick={onClickNav} size="50px" />
      </span>
      <nav className={styles.nav}>
        <form className={styles.search}>
          <TextInput
            label="Go to Subreddit"
            onChange={onChangeSubreddit}
            onKeyPress={onKeyPress}
            value={inputSubreddit}
          />
        </form>
        <ul>{renderNavData}</ul>
      </nav>
      <div className={styles.buttons}>
        <span className={styles.buttonLayout}>
          <Button onClickEvent={onShowAddSubreddit} label="Add Subreddit" />
        </span>
      </div>
    </div>
  );
}

export default Navbar;
