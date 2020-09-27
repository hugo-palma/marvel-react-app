import IData from '../IData';
import {Result} from './Result'
export default interface Data extends IData {
    offset: string;
    limit: string;
    total: string;
    count: string;
    results: Result[];
}