import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

import { addSubreddit } from "../../Reddit/subreddits";
import styles from "./AddSubreddit.module.scss";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Modal from "../Modal/Modal";

function AddSubreddit({ onClose, fetchSubreddits }) {
  const [subreddit, setSubreddit] = useState("");

  function onChangeSubreddit(id, value) {
    setSubreddit(value);
  }

  function onClick(event) {
    event.preventDefault();
    addSubreddit(subreddit);
    fetchSubreddits();
    onClose();
  }

  return (
    <Modal onClose={onClose} size="small">
      <form className={styles.layout}>
        <span className={styles.closeButton}>
          <IoIosClose alt="Close" onClick={onClose} size="40px" />
        </span>
        <div className={styles.subredditInput}>
          <TextInput label="Subreddit" onChange={onChangeSubreddit} />
        </div>
        <div className={styles.addButton}>
          <Button type="submit" label="Add" onClickEvent={onClick} />
        </div>
      </form>
    </Modal>
  );
}

export default AddSubreddit;
