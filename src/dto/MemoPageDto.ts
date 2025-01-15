import MemoDto from "./MemoDto";

export default interface MemoPageDto {
  number: number;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
  content: MemoDto[];
}
