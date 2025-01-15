import axios from "axios";

import mymoApi from "@/config/mymo-api.json";
import MemoPageDto from "@/dto/MemoPageDto";

/**
 * 메모 작성 API 호출 서비스
 */
export default class MemoService {
  private static _instance?: MemoService;

  private readonly memoUrl: URL;

  private constructor() {
    this.memoUrl = new URL(mymoApi.api.memo, mymoApi.baseUrl);
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new MemoService();
    }

    return this._instance;
  }

  /**
   * 메모 작성 API 호출
   */
  public async create(formEl: HTMLFormElement) {
    const formData = new FormData(formEl);

    return axios.post(this.memoUrl.href, formData, {
      withCredentials: true,
    });
  }

  /**
   * 메모 불어오기 API 호출
   */
  public async read(page: number = 1, size: number = 20) {
    return axios.get<MemoPageDto>(this.memoUrl.href, {
      params: {
        page: page - 1,
        size,
      },
      withCredentials: true,
    });
  }
}
