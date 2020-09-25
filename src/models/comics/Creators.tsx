import { Item } from "./Item";



export interface Creators {
    available: string;
    returned: string;
    collectionURI: string;
    items: Item[];
}
