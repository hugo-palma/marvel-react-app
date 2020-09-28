import IImages from "./IImages";

interface IResult{
    id:number,
    title?: string,
    name?: string,
    thumbnail?: IImages,
    images?: Array<IImages>
}
export default IResult;