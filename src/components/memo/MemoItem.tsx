import MemoDto from "@/dto/MemoDto";

import styles from "./MemoItem.module.scss";
import Link from "next/link";

interface MemoItemProps {
  memoDto: MemoDto;
}

/**
 * 메모 리스트의 아이템
 */
export default function MemoItem(props: MemoItemProps) {
  const date = new Date(props.memoDto.updatedAt);

  const CONTENT_LENGTH_LIMIT = 40;

  const content =
    props.memoDto.content.length > CONTENT_LENGTH_LIMIT
      ? props.memoDto.content.substring(0, CONTENT_LENGTH_LIMIT) + "..."
      : props.memoDto.content;

  return (
    <li className={styles["memo-item"]}>
      <Link href={`/mymo/${props.memoDto.id}`}>
        <div className={styles["memo-item__header"]}>
          <p className={styles["header__title"]}>{props.memoDto.title}</p>
        </div>
        <div className={styles["memo-item__body"]}>
          <p className={styles["body__content"]}>{content}</p>
          <p className={styles["body__time"]}>{`${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()} ${date.getHours()}시 ${date.getMinutes()}분`}</p>
        </div>
      </Link>
    </li>
  );
}
