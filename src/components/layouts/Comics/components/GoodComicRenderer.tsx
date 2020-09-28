import React, { useState, useEffect } from "react";
import path from "path";


import { placeholderMarvelImage } from "src/images/index";
import ComicCard from "src/components/layouts/Comics/components/ComicCard";
import IImage from "src/models/IImages";
import { ComicImagesUrlCreator } from "src/lib/ComicImageUrlCreator";
const placeholderMarvelImagePath = path.resolve(placeholderMarvelImage);

interface Props {
  id: number | undefined;
  title: string | undefined;
  images: Array<IImage> | undefined;
  classes: any;
}

const RowItem = React.memo(function RowItem(props: Props) {
  const [currentId, setCurrentId] = useState(props.id);
  const [currentTitle, setCurrentTitle] = useState(props.title);
  const [currentImages, setCurrentImages] = useState(props.images);
  useEffect(() => {
    setCurrentId(props.id)
    setCurrentTitle(props.title)
    setCurrentImages(props.images)
  }, [props])
  return (
    <div className={props.classes} key={currentId}>
      <ComicCard
        title={currentTitle}
        imagePath={currentImages && currentImages.length > 0 ? ComicImagesUrlCreator.createComicImageUrl(
           currentImages[0].path, currentImages[0].extension) : placeholderMarvelImagePath}
        id={props.id}
        style={{}}
      />
    </div>
  );
});
export default RowItem;
