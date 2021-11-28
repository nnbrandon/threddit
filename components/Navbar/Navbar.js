import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";

function Navbar({
  isHome,
  navData,
  onClickNav,
  onClickNavItem,
  onShowAddSubreddit,
}) {
  const router = useRouter();
  const { subreddit } = router.query;
  const [inputSubreddit, setInputSubreddit] = useState("");

  let isMobile;
  if (typeof window !== "undefined") {
    // Client-side-only code
    isMobile = window.screen.width >= 320 && window.screen.width <= 480;
  }

  const renderNavData = navData.map((data, index) => {
    return (
      <li key={index}>
        <Link href={data.path}>
          <a
            className={
              !isHome && subreddit === data.text ? styles.selected : ""
            }
            onClick={() => {
              onClickItem(data.text);
            }}
          >
            {data.text}
          </a>
        </Link>
      </li>
    );
  });

  function onClickItem(sreddit) {
    onClickNavItem(sreddit);
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
      // if (!inputSubreddit) {
      //   history.push("/home");
      // } else {
      //   history.push("/r/" + inputSubreddit);
      // }

      // if (isMobile) {
      //   onClickNav();
      // }
    }
  }

  return (
    <div className={styles.sidebar}>
      <span className={styles.closeButton}>
        <IoIosClose alt="Close" onClick={onClickNav} size="50px" />
      </span>
      <nav className={styles.nav}>
        <form className={styles.search}>
          <TextInput
            label="Search *coming soon*"
            onChange={onChangeSubreddit}
            onKeyPress={onKeyPress}
            value={inputSubreddit}
          />
        </form>
        <ul>
          <Link href="/">
            <a
              className={isHome ? styles.selected : ""}
              onClick={() => {
                onClickItem("");
              }}
            >
              Home
            </a>
          </Link>
          {renderNavData}
        </ul>
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
