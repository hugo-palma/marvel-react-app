import { comicsProperties } from "../properties";
export class ComicImagesUrlCreator {
  static defaultSize: string = comicsProperties.defaultSize;
  static pathSuffix: string = comicsProperties.pathSuffix;
  static imageExtensionPrefix: string = comicsProperties.imageExtensionPrefix;
  public static createComicImageUrl(path?: string, imageExtension?: string) {
    return (
      path +
      this.pathSuffix +
      this.defaultSize +
      this.imageExtensionPrefix +
      imageExtension
    );
  }
}
