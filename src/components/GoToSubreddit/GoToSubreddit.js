import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { IoIosClose } from 'react-icons/io';

import styles from './GoToSubreddit.module.scss';
import Button from '../../shared/Button/Button';
import TextInput from '../../shared/TextInput/TextInput';
import Modal from '../../shared/Modal/Modal';

function GoToSubreddit({onClose}) {
    const [subreddit, setSubreddit] = useState('');
    const history = useHistory();

    function onChangeSubreddit(id, value) {
        setSubreddit(value);
    }

    function onClick(event) {
        event.preventDefault();
        onClose();
        history.push('/r/' + subreddit);
    }

    return (
        <Modal onClose={onClose} size="small">
            <form className={styles.layout}>
                <span className={styles.closeButton}>
                    <IoIosClose alt="Close" onClick={onClose} size="40px" />
                </span>
                <div className={styles.subredditInput}>
                    <TextInput label="Subreddit" onChange={onChangeSubreddit}/>
                </div>
                <div className={styles.goButton}>
                    <Button type="submit" label="Go" onClickEvent={onClick}/>
                </div>
            </form>
        </Modal>
    )
}

export default GoToSubreddit;
