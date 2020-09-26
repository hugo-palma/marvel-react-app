import IImage from "./IImages";

interface IResult{
    id:number,
    title: string,
    images: Array<IImage>
}
export default IResult;