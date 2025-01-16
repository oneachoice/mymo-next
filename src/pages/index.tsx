import Link from "next/link";

import styles from "@/styles/modules/Home.module.scss";

export default function Home() {
  return (
    <div className={styles["container"]}>
      <h1>환영합니다!</h1>
      <h2>일상의 모든 것을 메모해보세요!</h2>
      <h2>
        <Link href={"/mymo"}>Mymo</Link> 시작하기!
      </h2>
    </div>
  );
}
