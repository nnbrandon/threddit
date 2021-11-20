import React from 'react';
import styles from './Button.module.scss';

function Button({type, onClickEvent, label}) {
    return (
        <button type="submit" className={styles.button} onClick={onClickEvent}>{label}</button>
    )
}

export default Button;
