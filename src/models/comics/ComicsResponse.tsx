import Data from './Data'
export default interface ComicsResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: Data;
    etag: string;
  }