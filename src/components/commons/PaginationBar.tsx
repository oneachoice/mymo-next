import Link from "next/link";
import styles from "./PaginationBar.module.scss";

interface PaginationBarProps {
  totalPages: number;
  number: number;
}

export default function PaginationBar(props: PaginationBarProps) {
  const startNumber = Math.max(1, props.number - 2);

  const endNumber = Math.min(props.number + 2, props.totalPages);

  const pageNumbers: number[] = [];

  for (let i = startNumber; i <= endNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles["pagination-bar"]}>
      <ol className={styles["pagination-list"]}>
        <li className={styles["pagination-item"]}>
          <Link href={`/mymo?page=0`}>first</Link>
        </li>
        {pageNumbers.map((pageNumber) => {
          return (
            <li key={pageNumber} className={styles["pagination-item"]}>
              <Link href={`/mymo?page=${pageNumber}`}>{pageNumber}</Link>
            </li>
          );
        })}
        <li className={styles["pagination-item"]}>
          <Link href={`/mymo?page=${props.totalPages}`}>last</Link>
        </li>
      </ol>
    </div>
  );
}
