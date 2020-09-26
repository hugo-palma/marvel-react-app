import React, { useState } from "react";
import ComicCard from "src/components/layouts/Comics/components/ComicCard";
import IImage from "src/models/IImages";
import { ComicImagesUrlCreator } from "src/lib/ComicImageUrlCreator";

interface Props {
  id: number | undefined;
  title: string | undefined;
  images: Array<IImage> | undefined;
  classes: any;
}

const RowItem = React.memo(function RowItem(props: Props) {
  const [currentId] = useState(props.id);
  const [currentTitle] = useState(props.title);
  const [currentImages] = useState(props.images);
  return (
    <div className={props.classes} key={currentId}>
      <ComicCard
        title={currentTitle}
        imagePath={ComicImagesUrlCreator.createComicImageUrl(
          currentImages && currentImages.length > 0
            ? currentImages[0].path
            : "",
          currentImages && currentImages.length > 0
            ? currentImages[0].extension
            : ""
        )}
        id={props.id}
        style={{}}
      />
    </div>
  );
});
export default RowItem;
