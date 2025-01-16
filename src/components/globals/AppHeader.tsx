import { MouseEventHandler, useCallback, useState } from "react";
import styles from "./AppHeader.module.scss";
import AccountNav from "./AccountNav";
import Link from "next/link";
import AuthFallbackContainer from "../containers/AuthFallbackContainer";

/**
 * 본문의 글로벌 헤더 컴포넌트입니다.
 */
export default function AppHeader() {
  // 오프캔버스 활성화 상태
  const [isActive, setIsActive] = useState(false);

  // 오프캔버스 온/오프 제어 핸들러
  const toggleOffcanvas = useCallback<MouseEventHandler>(() => {
    setIsActive((state) => !state);
  }, []);

  /** 온/오프 상태에 따라 버튼의 클래스 네임 지정 */
  const buttonClassName = [
    styles["button"],
    isActive ? styles["cross"] : "",
  ].join(" ");

  /** 온/오프 상태에 따라 오프캔버스 클래스 네임 지정 */
  const offcanvasClassName = [
    styles["offcanvas"],
    isActive ? styles["open"] : "",
  ].join(" ");

  return (
    <>
      <header className={styles["header"]}>
        {/* 로고 */}
        <div>
          <Link className={styles["logo"]} href={"/"}>
            Mymo
          </Link>
        </div>
        {/* /로고 */}
        <div>
          <button onClick={toggleOffcanvas} className={buttonClassName}>
            <span className={styles["button__line"]}></span>
            <span className={styles["button__line"]}></span>
            <span className={styles["button__line"]}></span>
          </button>
        </div>
      </header>
      <div className={offcanvasClassName}>
        <nav className={styles["offcanvas__nav"]}>
          <div className={styles["offcanvas__header"]}>
            <button onClick={toggleOffcanvas} className={buttonClassName}>
              <span className={styles["button__line"]}></span>
              <span className={styles["button__line"]}></span>
              <span className={styles["button__line"]}></span>
            </button>
            <AccountNav />
          </div>
          {/* 오프캔버스 네비게이션 */}
          <ul className={styles["nav-list"]}>
            <AuthFallbackContainer>
              <li className={styles["nav-list__item"]}>
                <Link href={"/mymo"}>Mymo</Link>
              </li>
            </AuthFallbackContainer>
          </ul>
        </nav>
      </div>
    </>
  );
}
