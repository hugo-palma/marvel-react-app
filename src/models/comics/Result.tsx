import { Events } from "./Events";
import { Stories } from "./Stories";
import { Characters } from "./Characters";
import { Creators } from "./Creators";
import { Image } from "./Image";
import { Thumbnail } from "./Thumbnail";
import { Price } from "./Price";
import { Date } from "./Date";
import { CollectedIssue } from "./CollectedIssue";
import { Collection } from "./Collection";
import { Variant } from "./Variant";
import { Series } from "./Series";
import { Url } from "./Url";
import { TextObject } from "./TextObject";
import IResult from "../IResults";



export interface Result extends IResult{
    id: number;
    digitalId: string;
    title: string;
    issueNumber: string;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: string;
    textObjects: TextObject[];
    resourceURI: string;
    urls: Url[];
    series: Series;
    variants: Variant[];
    collections: Collection[];
    collectedIssues: CollectedIssue[];
    dates: Date[];
    prices: Price[];
    thumbnail: Thumbnail;
    images: Image[];
    creators: Creators;
    characters: Characters;
    stories: Stories;
    events: Events;
}
