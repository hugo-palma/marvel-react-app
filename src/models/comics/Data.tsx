import {Result} from './Result'
export default interface Data {
    offset: string;
    limit: string;
    total: string;
    count: string;
    results: Result[];
}