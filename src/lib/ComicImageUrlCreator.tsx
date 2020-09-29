import { comicsProperties } from "../properties";
export class ImagesUrlCreator {
  static defaultSize: string = comicsProperties.defaultSize;
  static modalSize: string = comicsProperties.modalSize;
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
  public static createModalImageUrl(path: string, imageExtension: string){
    return (
      path +
      this.pathSuffix +
      this.modalSize +
      this.imageExtensionPrefix +
      imageExtension
    );
  }
}
