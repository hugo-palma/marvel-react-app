import IScrollable from "../IScrollable";
import Data from "./Data";

export default interface CharactersResponse extends IScrollable{
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;
}



