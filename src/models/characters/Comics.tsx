import { Item } from "./Item";



export interface Comics {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}
