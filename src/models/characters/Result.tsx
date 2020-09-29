import IResult from "../IResults";
import { Series } from "./Series";
import { Events } from "./Events";
import { Stories } from "./Stories";
import { Comics } from "./Comics";
import { Thumbnail } from "./Thumbnail";
import { Url } from "./Url";



export default interface Result extends IResult{
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}
