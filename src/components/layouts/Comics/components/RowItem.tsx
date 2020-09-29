import React, { useState, useEffect } from "react";

import ComicCard from "src/components/layouts/Comics/components/ComicCard";
import IResult from "src/models/IResults";

interface Props {
  itemInfo: IResult | undefined
  classes: any;
}

const RowItem = React.memo(function RowItem(props: Props) {
  const [itemInfo, setItemInfo] = useState(props.itemInfo);
  useEffect(() => {
    setItemInfo(props.itemInfo)
  }, [props])
  //TODO: handle lack of info with default data
  if(!itemInfo) return null
  return (
    <div className={props.classes} key={itemInfo.id}>
      <ComicCard
        result={itemInfo}
        style={{}}
      />
    </div>
  );
});

export default RowItem;
