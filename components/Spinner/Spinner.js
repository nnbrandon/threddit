import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import styles from './Spinner.module.scss';

function Spinner({ size }) {
  return (
    <FaSpinner
      alt="Loading..."
      icon="spinner"
      className={styles.spinner}
      size={'40px' || size}
    />
  );
}

export default Spinner;
