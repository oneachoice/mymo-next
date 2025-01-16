import Link from "next/link";
import styles from "./LinkButton.module.scss";

interface LinkButtonProps {
  text?: string;
  href: string;
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <Link className={styles["link-button"]} href={props.href}>
      {props.text}
    </Link>
  );
}
