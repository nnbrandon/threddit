import React, {useState} from 'react';
import styles from './TextInput.module.scss';

function TextInput({
    id,
    type = 'text',
    locked,
    focused,
    value,
    error,
    label = '',
    onChange,
    onKeyPress
}) {
    const [active, setActive] = useState((locked && focused) || false);
    const [inputValue, setInputValue] = useState(value || '');
    const [inputError, setInputError] = useState(error || '');

    function onChangeEvent(event) {
        const value = event.target.value;
        setInputValue(value);
        setInputError('');
        return onChange(id, value);
    }

    const fieldClassName = `${styles.field} ${(locked ? active : active || value) &&
        styles.active} ${(locked && !active) ? styles.locked : undefined}`;

    const placeholder = active ? '' : label;

    return (
        <div className={fieldClassName}>
            <input
                id={id}
                type={type}
                value={inputValue}
                placeholder={placeholder}
                onChange={onChangeEvent}
                onFocus={() => !locked && setActive(true)}
                onBlur={() => !locked && setActive(false)}
                onKeyPress={onKeyPress}
                spellCheck="false"
            />
            <label htmlFor={id} className={error && 'error'}>
                {inputError || label}
            </label>
        </div>
    )
}

export default TextInput;
