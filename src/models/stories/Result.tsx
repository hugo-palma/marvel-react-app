import { Originalissue } from "./Originalissue";
import { Creators } from "./Creators";
import { Characters } from "./Characters";
import { Events } from "./Events";
import { Series } from "./Series";
import { Thumbnail } from "./Thumbnail";
import { Comics } from "./Comics";
import IResult from "../IResults";


export default interface Result extends IResult{
    id: number;
    title: string;
    description: string;
    resourceURI: string;
    type: string;
    modified: string;
    thumbnail: Thumbnail;
    comics: Comics;
    series: Series;
    events: Events;
    characters: Characters;
    creators: Creators;
    originalissue: Originalissue;
}
