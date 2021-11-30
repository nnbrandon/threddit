import { useState } from "react";

import styles from "./Comment.module.scss";

import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";

export default function More({ more, index, onClickLoadMore }) {
  const { depth, children } = more;
  const [loading, setLoading] = useState(false);

  const isMobile = window.screen.width >= 320 && window.screen.width <= 480;
  const marginLeft = isMobile ? `${depth * 3.5 + 0}%` : `${depth * 0.8 + 0}%`;

  const label =
    children.length > 1
      ? `${children.length} more replies`
      : `${children.length} more reply`;
  return (
    <div className={styles.comment} style={{ marginLeft }}>
      {!loading ? (
        <Button
          label={label}
          onClickEvent={() => {
            setLoading(true);
            onClickLoadMore(more, index);
          }}
        />
      ) : (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
