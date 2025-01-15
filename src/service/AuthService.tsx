import mymoApi from "@/config/mymo-api.json";
import { signIn } from "@/redux/signSlice";
import { store } from "@/redux/store";

import axios from "axios";

/**
 * Auth API 호출 서비스
 */
export default class AuthService {
  private static _instance?: AuthService;

  private readonly signUpUrl: URL;

  private readonly signInUrl: URL;

  /** 로컬 스토리지에 저장된 로그인 상태의 유효기간 */
  private SESSION_EXPIRATION_PERIOD = 1000 * 60 * 30;

  private constructor() {
    this.signUpUrl = new URL(mymoApi.api["sign-up"], mymoApi.baseUrl);
    this.signInUrl = new URL(mymoApi.api["sign-in"], mymoApi.baseUrl);
  }

  public static get instance() {
    if (this._instance === undefined) {
      this._instance = new AuthService();
    }

    return this._instance;
  }

  /** 회원가입 API 호출 */
  public async signUp(formEl: HTMLFormElement) {
    const formData = new FormData(formEl);

    return await axios.post(this.signUpUrl.href, formData, {
      withCredentials: true,
    });
  }

  /**
   * 로그인 API를 호출, 로그인 성공 시 localStorage에 로그인 상태를 담습니다.
   * @param formEl
   * @returns
   */
  public async signIn(formEl: HTMLFormElement) {
    const formData = new FormData(formEl);

    const response = await axios.post(this.signInUrl.href, formData, {
      withCredentials: true,
    });

    if (response.status >= 200 && response.status < 300) {
      localStorage.setItem("session", Date.now().toString());

      store.dispatch(signIn());
    }

    return response;
  }

  /** 현재 로컬스토리지에 세션이 유효한지 확인합니다. */
  public isSessionValid(): boolean {
    const sessionValue = localStorage.getItem("session");

    if (sessionValue === null) return false;

    if (this.isExpired(+sessionValue)) {
      // 세션 기간 만료시 삭제
      this.clearSession();

      return false;
    }

    return true;
  }

  /**
   * @param millisecond 세션이 생성된 시점
   * @returns 세션 만료 여부
   */
  private isExpired(millisecond: number): boolean {
    return Date.now() - millisecond > this.SESSION_EXPIRATION_PERIOD
      ? true
      : false;
  }

  /**
   * 로컬 스토리지에 담긴 로그인 상태 지우기
   */
  private clearSession() {
    localStorage.removeItem("session");
  }
}
