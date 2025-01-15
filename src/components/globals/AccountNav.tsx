import Link from "next/link";
import styles from "./AccountNav.module.scss";
import AuthFallbackContainer from "../containers/AuthFallbackContainer";

/**
 * 현재 계정 상태를 보여주는 로그인/회원가입 컴포넌트 입니다.
 */
export default function AccountNav() {
  return (
    <AuthFallbackContainer fallback={<SignedOut />}>
      <SignedIn />
    </AuthFallbackContainer>
  );
}

function SignedOut() {
  return (
    <div className={styles["account-nav__container"]}>
      <Link href="/sign-in">Sign In</Link> /{" "}
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}

function SignedIn() {
  return (
    <div className={styles["account-nav__container"]}>
      <span>Account</span>
    </div>
  );
}
