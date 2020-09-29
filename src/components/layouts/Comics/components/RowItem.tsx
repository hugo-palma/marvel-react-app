import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';

import IResult from "src/models/IResults";
import ElementCardFactory from 'src/lib/ElementCardFactory'

interface Props {
  itemInfo: IResult | undefined
  classes: any;
}

const RowItem = React.memo(function RowItem(props: Props) {
  //TODO: improve factory entry param
  const cardFactory = new ElementCardFactory();
  const location = useLocation();
  console.log(`el lugar es:${location.pathname}`);
  const ItemCard = cardFactory.getElementCard(location.pathname) as React.FC<{
  result: IResult;
  style: any;}>
  const [itemInfo, setItemInfo] = useState(props.itemInfo);
  useEffect(() => {
    setItemInfo(props.itemInfo)
  }, [props])
  //TODO: handle lack of info with default data
  if(!itemInfo) return null
  return (
    <div className={props.classes} key={itemInfo.id}>
      <ItemCard
        result={itemInfo}
        style={{}}
      />
    </div>
  );
});

export default RowItem;
